
import { consulta, insertarProv, validarProv, actualizarProv, eliminarProv } from '../model/proveedores_model.js';
const mError = 'Error en la consulta';

function leerProveedor(req, res) {
    req.getConnection((error, conexion) => {
        if (error) return res.status(500).json({ error: 'Fallo la conexión con la base de datos' });
        consulta(conexion, (err, resultado) => {
            if (err) return res.status(401).json({ err: mError });
            res.status(200).json(resultado);
        });
    });
};

function crearProveedor(req, res) {
    const { nit, nombre, correo, direccion, telefono } = req.body;
    const datos = [nit, nombre, correo, direccion, telefono];
    let valid = false;
    req.getConnection((error, conexion) => {
        if (error) return res.status(500).json({ error: 'Error en conexión con base de datos' });
        validarProv(conexion, datos, valid, (err, resultado) => {
            if (err) return res.status(400).json({ err: 'Error en la consulta' });
            if (resultado.length > 0) return res.status(409).json({ mensaje: 'Proveedor ya existe' });
            insertarProv(conexion, datos, (err, resultado) => {
                if (err) return res.status(500).json({ err: mError });
                res.status(200).json({ mensaje: 'Proveedor creado con exito', resultado });
            });
        });
    });
};


function actualizarProveedor(req, res) {
    const { nit, nombre, correo, direccion, telefono, id } = req.body;
    const datos = [nit, nombre, correo, direccion, telefono, id];
    let valid = true;
    req.getConnection((error, conexion) => {
        if (error) return res.status(500).json({ error: 'Error en conexión con base de datos' });
        validarProv(conexion, datos, valid, (err, resultados) => {
            if (err) return res.status(400).json({ err: 'Error en la consulta', err });
            if (resultados.length > 0) return res.status(403).json({ mensaje: 'alguno datos de proveedor ya existen' });
            actualizarProv(conexion, datos, (err, resultado) => {
                if (err) return res.status(400).json({ err: 'Error en la consulta', err });
                res.status(200).json({ mensaje: 'Proveedor actualizado', resultado });
            });
        });
    });
};

function eliminarProveedor(req, res) {
    const id = parseInt(req.params.id);
    req.getConnection((error, conexion) => {
        if (error) return res.status(500).json({ error: 'Fallo la conexión con la base de datos' });
        eliminarProv(conexion, id, (err, resultados) => {
            if (err) return res.status(400).json({ err: 'Error al eliminar usuario', error: err });
            res.status(200).json({ mensaje: 'Usuario eliminado', resultados });
        });
    });
}
export { leerProveedor, crearProveedor, actualizarProveedor, eliminarProveedor };