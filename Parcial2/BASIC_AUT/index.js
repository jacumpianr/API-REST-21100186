const express = require('express');
const app = express();

// Credenciales de ejemplo 
const USER = 'admin';
const PASSWORD = '1235';

// Middleware de autenticación básica
function basicAuth(req, res, next) {
  // Obtiene el encabezado "Authorization"
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).send('Autenticación requerida');
    }

    // Decodifica el encabezado "Basic base64(user:pass)"
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
    const [user, password] = credentials.split(':');

    // Verifica credenciales
    if (user === USER && password === PASSWORD) {
        next(); // autenticado
    } else {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).send('Credenciales inválidas');
    }
}

// Ruta protegida
app.get('/secreto', basicAuth, (req, res) => {
    res.send('Bienvenido al area secreta');
});

// Ruta publica
app.get('/', (req, res) => {
    res.send('Bienvenido al servidor publico');
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
