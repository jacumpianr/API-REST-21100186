const express = require("express");
const YAML = require("yamljs");
const path = require("path");

const app = express();
const PORT = 3000;

const config = YAML.load(path.join(__dirname, "config.yaml"));

app.get("/", (req, res) => {
  res.send(`Bienvenido al servidor Express. Nombre del proyecto: ${config.nombre}`);
});

app.get("/info", (req, res) => {
  res.json({
    proyecto: config.nombre,
    version: config.version,
    autor: config.autor,
    puerto: config.puerto
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});