const express = require('express');
const app = express();
const port = 3000; 

const { calcularArea, calcularPerimetro } = require('./funciones.js');

/**
 * Ruta que calcula el área y perímetro de un rectángulo fijo.
 * @route GET /calcular
 * @returns {string} Mensaje con el área y perímetro calculado.
 */

app.get('/calcular', (req, res) => {
    try {
        const area = calcularArea(10, 5);
        const perimetro = calcularPerimetro(10, 5);
        res.send(`El área es ${area} y el perímetro es ${perimetro}.`);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
