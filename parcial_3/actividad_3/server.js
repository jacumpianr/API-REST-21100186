const express = require('express');
const apicache = require('apicache');

const app = express();
const port = 3000;

let cache = apicache.middleware;

const simulateSlowProcess = (req, res, next) => {
    console.log('Procesando solicitud (sin caché)...');
    setTimeout(() => {
        next(); 
    }, 3000);
};

app.get('/api/slow-data', cache('10 seconds'), simulateSlowProcess, (req, res) => {
    const data = {
        message: 'Datos obtenidos con éxito',
        timestamp: new Date().toISOString(),
        source: 'API endpoint'
    };
    res.json(data);
});

app.get('/api/no-cache', simulateSlowProcess, (req, res) => {
    const data = {
        message: 'Datos obtenidos sin caché',
        timestamp: new Date().toISOString(),
        source: 'API endpoint'
    };
    res.json(data);
});

app.listen(port, () => {
    console.log(`Servidor Express ejecutándose en http://localhost:${port}`);
    console.log(`Prueba la ruta con caché: http://localhost:${port}/api/slow-data`);
    console.log(`Prueba la ruta sin caché: http://localhost:${port}/api/no-cache`);
});