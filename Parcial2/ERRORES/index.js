const express = require("express");
const YAML = require("yamljs");
const path = require("path");
const errorMiddleware = require("./middleware/errores-middleware.js");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Bienvenido al servidor Express.");
});

app.get('/error', (req, res) => {
  throw new Error('Algo salió mal en esta ruta!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.use(errorMiddleware);