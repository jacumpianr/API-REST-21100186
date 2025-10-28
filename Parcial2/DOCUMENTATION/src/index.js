const express = require("express");
const artistasRoutes = require('../routes/rout_artista.js');
const path = require("path");
// Documentation con SWAGGER
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
        title: "API Artistas Musicales",
        version: "1.0.0",
        description: "Documentación de la API para gestión de artistas musicales",
        },
        servers: [
        {
            url: "http://localhost:3000",
        },
        ],
    },
    apis: [`${path.join(__dirname, "../routes/rout_artista.js")}`],
};

// Crear documentación
const swaggerDocs = swaggerJsDoc(swaggerOptions);


// Middleware Swagger UI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Rutas
app.use('/artistas', artistasRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});