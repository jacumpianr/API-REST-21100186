const fs = require("fs");
const path = require("path");

// Ruta al archivo json
const musicaBD = path.join(__dirname, '..', 'data_base','musica.json');

// Funcion para leer la BD
function leerBD() {
    const data = fs.readFileSync(musicaBD, 'utf8');
    return JSON.parse(data);
}

// Funcion para escribir en la BD
function escribirBD() {
    fs.writeFileSync(rutaBD, JSON.stringify(data, null, 2), 'utf8');
}

// GET - Obtener todos los artistas
const obtenerArtistas = (req, res) => {
    const data = leerBD();
    res.json(data.Artistas);
};

// POST - Agregar un nuevo artista
const agregarArtista = (req, res) => {
    const { nombre, edad, fecha_nacimiento } = req.body;

    if (!nombre || !edad || !fecha_nacimiento) {
        return res.status(400).json({ mensaje: 'Faltan datos del artista.' });
    }

    const data = leerBD();
    const nuevoId = data.Artistas.length > 0 ? data.Artistas[data.Artistas.length - 1].id + 1 : 1;

    const nuevoArtista = { id: nuevoId, nombre, edad, fecha_nacimiento };
    data.Artistas.push(nuevoArtista);

    escribirBD(data);

    res.status(201).json({ mensaje: 'Artista agregado correctamente.', artista: nuevoArtista });
};

module.exports = { obtenerArtistas, agregarArtista };