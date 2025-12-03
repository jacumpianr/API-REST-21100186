import express from 'express';

const app = express();

app.get('/saludo', (req, res) => {
    res.json({ mensaje: 'Hola mundo' });
});

export default app;