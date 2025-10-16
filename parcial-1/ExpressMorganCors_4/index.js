import express from 'express';
import cors from 'cors';
import {routerCli} from './router/clientes.js';
import {routerPro} from './router/proveedores.js';
// Importamos morgan para crear un logger (middleware)
import morgan from 'morgan';
import fs from 'fs'
import path from 'path'
import { fileURLToPath} from 'url';

const app = express();
const port = 4200;

// Solucion -dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Uso de Morgan para log guardado en ruta
const logDirectory = path.join(__dirname, 'logs');
// Crar el log en access.log
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'));
// Formato de Morgan
app.use(morgan('combined', {stream: accessLogStream}));

app.use(cors());
app.use('/clientes', routerCli);
app.use('/proveedores', routerPro);

app.listen(port, ()=>{
    console.log(`Server corriendo en http://localhost:${port}`)
})