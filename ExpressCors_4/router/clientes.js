import express from 'express';
const routerCli = express.Router();

routerCli.get('/', (req, res) => {
   res.send("Hola mundo!");
});

routerCli.post('/', (req, res) => {
    res.send("Hola mundo!"); 
});

export {routerCli};
