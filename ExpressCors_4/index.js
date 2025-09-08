import express from 'express';
import cors from 'cors';
import {routerCli} from './router/clientes.js'
import {routerPro} from './router/proveedores.js'

const app = express();
const port = 3000;

// app.use(cors());
app.use('/clientes', routerCli)
app.use('/proveedores', routerPro)

app.listen(port, ()=>{
    console.log("Server corriendo en http://localhost:3000")
})