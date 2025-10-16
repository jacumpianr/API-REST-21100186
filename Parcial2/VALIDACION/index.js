const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

// Ruta con validación
app.post('/registro',
    [
        body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
        body('email').isEmail().withMessage('Debe ser un email válido'),
        body('edad').isInt({ min: 18 }).withMessage('Debe ser mayor o igual a 18')
    ],
    (req, res) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
        }
        res.json({ mensaje: 'Usuario registrado correctamente' });
    }
);

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
