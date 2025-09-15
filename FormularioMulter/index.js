import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs'
import path from 'path'
import { fileURLToPath} from 'url';
import artistasRoutes from './routes/artistas.js'

const app = express();
const port = 4200;

// Solucion __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Uso de Morgan para log guardado en ruta
const logDirectory = path.join(__dirname, 'logs');
// Crar el log en access.log
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'));
// Formato de Morgan
app.use(morgan('combined', {stream: accessLogStream}));
app.use(cors());
app.use(express.json())

app.use("/artistas", artistasRoutes);

app.listen(port, ()=>{
    console.log(`Server corriendo en http://localhost:${port}`)
})