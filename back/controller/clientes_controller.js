
import { consulta, insertarClient, validarClient, actualizarClient, eliminarClient } from '../model/clientes_model.js';
const mError = 'Error en la consulta';

function leerCliente(req, res) {
    req.getConnection((error, conexion) => {
        if (error) return res.status(500).json({ error: 'Fallo la conexión con la base de datos' });
        consulta(conexion, (err, resultado) => {
            if (err) return res.status(401).json({ err: mError });
            res.status(200).json(resultado);
        });
    });
};

function crearCliente(req, res) {
    const { nombre, apellido, documento, correo, telefono, direccion } = req.body;
    const datos = [nombre, apellido, documento, correo, telefono, direccion];
    let valid = false;
    req.getConnection((error, conexion) => {
        if (error) return res.status(500).json({ error: 'Error en conexión con base de datos' });
        validarClient(conexion, [documento, correo, telefono], valid, (err, resultado) => {
            if (err) return res.status(400).json({ err: 'Error en la consulta', err });
            if (resultado.length > 0) return res.status(409).json({ mensaje: 'Algunos datos de este cliente ya existen' });
            insertarClient(conexion, datos, (err, resultado) => {
                if (err) return res.status(500).json({ err: mError });
                res.status(200).json({ mensaje: 'cliente creado con exito', resultado });
            });
        });
    });
};


function actualizarCliente(req, res) {
    const { nombre, apellido, documento, correo, telefono, direccion, id } = req.body;
    const datos = [nombre, apellido, documento, correo, telefono, direccion, id];
    let valid = true;
    req.getConnection((error, conexion) => {
        if (error) return res.status(500).json({ error: 'Error en conexión con base de datos' });
        validarClient(conexion, [documento, correo, telefono, id], valid, (err, resultado) => {
            if (err) return res.status(400).json({ err: 'Error en la consulta', err });
            if (resultado.length > 0) return res.status(409).json({ mensaje: 'Algunos datos de este cliente ya existen' });
            actualizarClient(conexion, datos, (err, resultado) => {
                if (err) return res.status(500).json({ err: mError, err });
                res.status(200).json({ mensaje: 'cliente actualizado con exito', resultado });
            });
        });
    });
};

function eliminarCliente(req, res) {
    const id = parseInt(req.params.id);
    req.getConnection((error, conexion) => {
        if (error) return res.status(500).json({ error: 'Fallo la conexión con la base de datos' });
        eliminarClient(conexion, id, (err, resultados) => {
            if (err) return res.status(400).json({ err: 'Error al eliminar usuario', error: err });
            res.status(200).json({ mensaje: 'Usuario eliminado', resultados });
        });
    });
}
export { leerCliente, crearCliente, actualizarCliente, eliminarCliente };