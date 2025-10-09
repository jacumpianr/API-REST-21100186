const express = require('express');
const app = express();
const port = 3000;

// Configurar Pug como motor de plantillas
app.set('view engine', 'pug');

// Indicar que las vistas están en la misma carpeta del archivo app.js
app.set('views', __dirname);

// Ruta principal
app.get('/', (req, res) => {
    app.render('index', { titulo: 'Bienvenido', mensaje: 'Hola desde Pug!' }, (err, html) => {
        if (err) {
        console.error(err);
        res.status(500).send('Error al renderizar la vista');
        } else {
        res.send(html);
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});