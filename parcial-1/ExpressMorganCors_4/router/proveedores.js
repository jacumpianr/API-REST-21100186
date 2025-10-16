import express from 'express';
const routerPro = express.Router();

routerPro.get('/', (req,res)=>{
    res.json({"message":"Hola Esta respondiendo a una peticion al router proveedores"})
});

routerPro.post('/', (req,res)=>{
   res.json({"message":"Hola Esta respondiendo a una peticion al router proveedores"})
});

export { routerPro };