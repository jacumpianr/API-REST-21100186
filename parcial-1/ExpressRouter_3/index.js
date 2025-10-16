const express = require('express');
const app = express();

const port = 3000;

const clientes = require('./router/clientes');
const proveedores = require('./router/proveedores');


app.use('/clientes',clientes.router)
app.use('/proveedores',proveedores.router)


app.listen(port, ()=>{
    console.log("server corriendo en http://localhost:3000")
})