// Ctrl + L para limpiar la consola
import express from 'express';
// Permite trabajar con archivos del mismo proyecto
import fs from 'fs';
// Agregar unh middleware
import bodyParser from "body-parser";

// Creamos una constnte llamda app igual a la ejecucion express creando el objeto de la aplicacion
// El objeto es app
const app = express();
// Se aplica antes de definir los endpoints para transformar las peticiones de http a json
app.use(bodyParser.json());

// creamos una funcion para leer los datos
const readBD = () => {
    try {
        const data = fs.readFileSync("./BD.json");
        return JSON.parse(data); // Recibe la infromacion de la BD
    }
    catch (error){
        console.log(error);
    }
};

// creamos una funcion para escribir los data 
const writeBD = (data) => {
    try {
        fs.writeFileSync("./BD.json", JSON.stringify(data));
    }
    catch (error){
        console.log(error);
    }
};

// Llamar la funcion 
readBD();

// Del objeto se creara un end point
// app - objeto
// get - metodo de http
// "/" - ruta principal
// callback(funcion) parametros(req, res) req = requisicion | res = respuesta
app.get("/", (req, res) => {
    res.send("¡Hola Mundo!"); // se usa el objeto de la respuesta(res) con la funcion send(texto plano)
});

// end point para los datos
app.get("/Alumno", (req, res) => {
    const data = readBD();
    res.json(data.Alumno);
});

// endpoint para obtener un alumno por id
app.get("/Alumno/:id", (req, res) => {
    const data = readBD();
    const id = parseInt(req.params.id);
    const Alumno = data.Alumno.find((Alumno) => Alumno.id === id);
    res.json(Alumno);
});

// endpoint de tipo post
app.post("/Alumno", (req, res) => {
    const data = readBD();
    const body = req.body;
    const newAlumno = {
        ...body,
    };
    data.Alumno.push(newAlumno);
    writeBD(data);
    res.json(newAlumno);
});

// endpoint de tipo put
app.put("/Alumno/:id", (req, res) => {
    const data = readBD();
    const body = req.body;
    const id = parseInt(req.params.id);
    const alumnoIndex = data.Alumno.findIndex((Alumno) => Alumno.id === id);
    data.Alumno[alumnoIndex] = {
        ...data.Alumno[alumnoIndex],
        ...body,
    };
    writeBD(data);
    res.json({message: "Alumno Actualizado Correctamente"});
});

//endpoint de tipo delete
app.delete("/Alumno/:id", (req, res) => {
    const data = readBD();
    const id = parseInt(req.params.id);
    const alumnoIndex = data.Alumno.findIndex((Alumno) => Alumno.id === id);
    data.Alumno.splice(alumnoIndex, 1);
    writeBD(data);
    res.json({message: "Alumno Borrado Correctamente"});
});

// Con esto ya esta listo el servidor
// Va a escuchar en el puerto 3000 
app.listen(3000, () => {
    console.log("Server listening on port 3000"); // Funcion call back opcional
});