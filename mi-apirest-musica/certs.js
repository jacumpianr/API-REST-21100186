// index.js
require('dotenv').config();
const fs = require('fs');
const https = require('https');
const express = require('express');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const KEYS_DIR = path.join(__dirname, 'keys');
const PRIVATE_KEY_PATH = process.env.JWT_PRIVATE_KEY_PATH || path.join(KEYS_DIR, 'jwt_private.pem');
const PUBLIC_KEY_PATH = process.env.JWT_PUBLIC_KEY_PATH || path.join(KEYS_DIR, 'jwt_public.pem');

const HTTPS_KEY_PATH = process.env.HTTPS_KEY_PATH || path.join(KEYS_DIR, 'https_key.pem');
const HTTPS_CERT_PATH = process.env.HTTPS_CERT_PATH || path.join(KEYS_DIR, 'https_cert.pem');

const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');
const publicKey = fs.readFileSync(PUBLIC_KEY_PATH, 'utf8');
const httpsKey = fs.readFileSync(HTTPS_KEY_PATH, 'utf8');
const httpsCert = fs.readFileSync(HTTPS_CERT_PATH, 'utf8');

const JWT_ALGO = 'RS256';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'; // ejemplo: 1h, 15m

function generateAccessToken(payload) {
    return jwt.sign(payload, privateKey, {
        algorithm: JWT_ALGO,
        expiresIn: JWT_EXPIRES_IN,
    });
}

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, publicKey, { algorithms: [JWT_ALGO] }, (err, decoded) => {
        if (err) {
        return res.status(401).json({ message: 'Token inválido', error: err.message });
        }
        req.user = decoded; 
        next();
    });
}

function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user) return res.status(401).json({ message: 'No autenticado' });

        const roles = user.roles || []; 
        const ok = roles.some(r => allowedRoles.includes(r));
        if (!ok) return res.status(403).json({ message: 'No autorizado' });
        next();
    };
}

app.get('/', (req, res) => {
    res.json({ message: 'API segura con JWT (RS256) y HTTPS' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

if (!username || password !== 'secret') {
    return res.status(401).json({ message: 'Credenciales inválidas' });
}

const payload = {
    sub: username,
    roles: username === 'admin' ? ['admin', 'user'] : ['user'],
};

const token = generateAccessToken(payload);
res.json({ accessToken: token, expiresIn: JWT_EXPIRES_IN });
});

app.get('/profile', authenticateJWT, (req, res) => {
    res.json({ message: 'Perfil del usuario', user: req.user });
});

app.get('/admin', authenticateJWT, authorizeRoles('admin'), (req, res) => {
    res.json({ message: 'Área administrativa', user: req.user });
});

app.get('/.well-known/jwks.pem', (req, res) => {
    res.type('text/plain').send(publicKey);
});

const PORT = process.env.PORT || 3443;
https.createServer({ key: httpsKey, cert: httpsCert }, app)
    .listen(PORT, () => {
    console.log(`Servidor HTTPS corriendo en https://localhost:${PORT}`);
});
