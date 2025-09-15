import express from 'express';
import { getArtistas, getArtistaById, createArtista, updateArtista, deleteArtista } from '../controllers/artistasController.js';
import upload from '../upload.js'

const router = express.Router();

router.get("/", getArtistas);
router.get("/:id", getArtistaById);
router.post("/", upload.single('Foto'), createArtista);
router.put("/:id", updateArtista);
router.delete("/:id", deleteArtista);

export default router