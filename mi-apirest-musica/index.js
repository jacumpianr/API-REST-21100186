const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SECRET_KEY = 'clave-secreta-super-segura';

// Ruta para login y obtener token
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Faltan credenciales' });
    }

    if (username === 'admin' && password === '1234') {
        const token = jwt.sign({ user: username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ message: 'Credenciales incorrectas' });
});

// Middleware para verificar token
function verificarToken(req, res, next) {
    const header = req.headers['authorization'];
    if (!header) return res.status(403).json({ message: 'Token requerido' });

    const token = header.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token inválido o expirado' });
        req.user = decoded.user;
        next();
    });
}

// Ruta protegida
app.get('/datos', verificarToken, (req, res) => {
    res.json({
        message: 'Acceso permitido',
        usuario: req.user,
        datos: ['Dato 1', 'Dato 2', 'Dato 3']
    });
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));