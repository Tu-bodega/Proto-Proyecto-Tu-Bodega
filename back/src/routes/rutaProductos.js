import express from "express";

const rutaProductos = express.Router();

rutaProductos.get("/leer", (req, res) => {
    req.getConnection((error, conexion) => {
        if (error) {
            return res.status(500).json({ error: 'fallo conexion con el servidor' });
        }
        conexion.query("SELECT * FROM productos", (err, lineas) => {
            if (err) {
                return res.status(400).json({ err: 'Tabla no encontrada' });
            }
            res.send(lineas);
            console.log('consulta exitosa status 200');
        });
    });
});



rutaProductos.post("/crear", (req, res) => {
    const consulta = 'nombre_producto, descripcion_producto, precio_compra_producto, precio_venta_producto, ';
    const consultaPartDos = 'unidades_producto, fecha_producto, unidades_medida_id, proveedores_id';

    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precioCompra = parseFloat(req.body.precioC);
    const precioVenta = parseFloat(req.body.precioV);
    const unidades = req.body.unidades;
    const fecha = req.body.fecha; // Uso correcto de new Date
    const unidadMedida = req.body.medida;
    const proveedor = req.body.proveedor;

    // Aquí podrías añadir validaciones para los datos recibidos
    

    req.getConnection((error, conexion) => {
        if (error) {
            return res.status(500).json({ error: 'Fallo conexión con el servidor' });
        }
        conexion.query(`INSERT INTO productos (${consulta}${consultaPartDos}) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombre, descripcion, precioCompra, precioVenta, unidades, fecha, unidadMedida, proveedor],
            (err, resultado) => {
                if (err) {
                    return res.status(400).json({ error: 'Tabla no encontrada o error en la consulta' });
                }
                res.status(200).json({ mensaje: 'Producto agregado exitosamente', id: resultado.insertId });
                console.log(`unidad Medida ${unidadMedida}`);
            });
    });
});



export default rutaProductos;
