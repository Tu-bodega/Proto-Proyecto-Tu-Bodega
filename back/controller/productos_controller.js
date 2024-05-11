
import { consulta, crearPro, validarPro, actualizarPro, eliminarPro } from '../model/productos_model.js';
const mError = 'Error en la consulta';

function leerProducto(req, res) {
    req.getConnection((error, conexion) => {
        if (error) return res.status(500).json({ error: 'Fallo la conexión con la base de datos' });
        consulta(conexion, (err, resultado) => {
            if (err) return res.status(401).json({ err: mError, err });
            res.status(200).json(resultado);
        });
    });
};

function crearProducto(req, res) {
    const valid = false;
    const { nombre, descripcion, fecha, precioC, precioV, unidades, medida, proveedor } = req.body;
    const [precioCompra, precioVenta, unidadesProducto, medidaProducto, proveedorId] =
        [precioC, precioV, unidades, medida, proveedor].map(val => parseInt(val));
    const imagen = req.file ? req.file.path : '';

    const datos = [nombre, descripcion, precioCompra, precioVenta, unidadesProducto, fecha, medidaProducto, proveedorId, imagen];

    req.getConnection((error, conexion) => {
        if (error) return res.status(500).json({ error: 'Error en conexión con la base de datos' });
        validarPro(conexion, datos[0], valid, (err, respuesta) => {
            if (err) return res.status(400).json({ err: "Error en la consulta", err });
            if (respuesta.length > 0) return res.status(403).json({ mensaje: 'El nombre del producto que intenta ingresar ya esta asignado' })
            crearPro(conexion, datos, (err, resultado) => {
                if (err) return res.status(400).json({ err: 'Error en la consulta', err });
                res.status(200).json({ mensaje: 'Producto creado satisfactoriamente' });
            });
        });
    });
};

function actualizarProducto(req, res) {
    const valid = true;
    const { nombre, descripcion, fecha, precioC, precioV, unidades, medida, proveedor, id } = req.body;
    const imagen = req.file ? req.file.path : '';
    const [precioCompra, precioVenta, unidadesProducto, medidaProducto, proveedorId, idPro] =
        [precioC, precioV, unidades, medida, proveedor, id].map(val => parseInt(val));

    const datos = [nombre, descripcion, precioCompra, precioVenta, unidadesProducto, fecha, medidaProducto, proveedorId, imagen, idPro];
    const validacion = [nombre, idPro];
    req.getConnection((error, conexion) => {
        if (error) return res.status(500).json({ error: 'Error en conexión con la base de datos' });
        validarPro(conexion, validacion, valid, (err, respuesta) => {
            if (err) return res.status(400).json({ err: "Error en la consulta", err });
            if (respuesta.length > 0) return res.status(403).json({ mensaje: 'El nombre del producto que intenta ingresar ya esta asignado' })
            actualizarPro(conexion, datos, (err, resultado) => {
                if (err) return res.status(400).json({ err: 'Error en la consulta', err });
                res.status(200).json({ mensaje: 'Producto actualizado satisfactoriamente' });
            });
        });
    });
};

function eliminarProducto(req, res) {
    const id = parseInt(req.params.id);
    req.getConnection((error, conexion) => {
        if (error) return res.status(500).json({ error: "Error en la conexion con la base de datos" })
            eliminarPro(conexion, id, (err, resultado) =>{
                if (err) return res.status(400).json({ err: "Error en la consulta", err });
                res.status(200).json({ mensaje: 'Producto Eliminado Satisfacotriamente'});
            });
    });
};


export { leerProducto, crearProducto, actualizarProducto, eliminarProducto };

