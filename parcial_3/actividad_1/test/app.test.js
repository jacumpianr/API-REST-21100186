import { test } from 'node:test';
import assert from 'node:assert';
import app from '../app.js';
import http from 'node:http';

let server;

test('GET /saludo debe regresar el mensaje Hola mundo', async (t) => {
    server = http.createServer(app);
    await new Promise(resolve => server.listen(0, resolve)); 

    const port = server.address().port;
    const respuesta = await fetch(`http://localhost:${port}/saludo`);
    const json = await respuesta.json();

    assert.strictEqual(json.mensaje, 'Adios mundo');
    
    server.close();
});