const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.json({"message":"Hola Esta respondiendo a una peticion al router proveedores"})
});

router.post('/', (req,res)=>{
   res.json({"message":"Hola Esta respondiendo a una peticion al router proveedores"})
});



module.exports.router=router;