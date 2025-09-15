import {pool} from '../db.js';

// Listar todos los artistas
export const getArtistas = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Artistas");
        res.json(rows);
    } catch (err) {
        console.error("Error en getArtistas:", err); 
        res.status(500).json({ error: err.message }); 
    }
};

// Obtener un artista por ID
export const getArtistaById = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Artistas WHERE Id = ?", [req.params.id]);
        res.json(rows[0] || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear artista
export const createArtista = async (req, res) => {
    try {
        const { Nombre, Nacionalidad, FechaNacimientos } = req.body;
        const foto = req.file ? req.file.filename : null; // nombre del archivo subido

        await pool.query(
        "INSERT INTO Artistas (Nombre, Nacionalidad, FechaNacimientos, Foto) VALUES (?, ?, ?, ?)",
        [Nombre, Nacionalidad, FechaNacimientos, foto]
        );

        res.json({ message: "Artista creado", archivo: foto });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar artista
export const updateArtista = async (req, res) => {
    try {
        const { Nombre, Nacionalidad, FechaNacimientos } = req.body;
        await pool.query(
        "UPDATE Artistas SET Nombre=?, Nacionalidad=?, FechaNacimientos=? WHERE Id=?",
        [Nombre, Nacionalidad, FechaNacimientos, req.params.id]
        );
        res.json({ message: "Artista actualizado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar artista
export const deleteArtista = async (req, res) => {
    try {
        await pool.query("DELETE FROM Artistas WHERE Id=?", [req.params.id]);
        res.json({ message: "Artista eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};