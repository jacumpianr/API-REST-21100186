/**
 * @swagger
 * tags:
 *   name: Artistas
 *   description: Endpoints para gestionar artistas musicales
 */

/**
 * @swagger
 * /artistas:
 *   get:
 *     summary: Obtiene la lista de todos los artistas
 *     tags: [Artistas]
 *     responses:
 *       200:
 *         description: Lista de artistas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   edad:
 *                     type: integer
 *                   fecha_nacimiento:
 *                     type: string
 */

/**
 * @swagger
 * /artistas:
 *   post:
 *     summary: Agrega un nuevo artista
 *     tags: [Artistas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               edad:
 *                 type: integer
 *               fecha_nacimiento:
 *                 type: string
 *     responses:
 *       201:
 *         description: Artista agregado correctamente
 */

const express = require('express');
const router = express.Router();
const { obtenerArtistas, agregarArtista } = require('../controllers/ctrl_artistas.js');

router.get('/', obtenerArtistas);
router.post('/', agregarArtista);

module.exports = router;