import express from "express";

const rutaProveedores = express.Router();

rutaProveedores.get("/leer", (req, res) => {
    req.getConnection((error, conexion) => {
        if (error) {
            return res.status(500).json({ error: 'fallo conexion con el servidor' });
        }
        conexion.query("SELECT * FROM proveedores", (err, lineas) => {
            if (err) {
                return res.status(400).json({ err: 'Tabla no encontrada' });
            }
            res.send(lineas);
            console.log('consulta exitosa status 200');
        });
    });
});



rutaProveedores.post("/crear", (req, res) => {
    const consulta = 'nit_proveedor, nombre_proveedor, correo_proveedor, direccion_proveedor,telefono_proveedor';

    const nit = String(req.body.nit);
    const nombre = String(req.body.nombre);
    const correo = String(req.body.correo);
    const direccion = String(req.body.direccion);
    const telefono = String(req.body.telefono);


    // Aquí podrías añadir validaciones para los datos recibidos
    

    req.getConnection((error, conexion) => {
        if (error) {
            return res.status(500).json({ error: 'Fallo conexión con el servidor' });
        }
        conexion.query(`INSERT INTO proveedores(${consulta}) VALUES (?, ?, ?, ?, ?)`,
            [nit, nombre, correo, direccion, telefono],
            (err, resultado) => {
                if (err) {
                    return res.status(400).json({ error: 'Tabla no encontrada o error en la consulta' });
                }
                res.status(200).json({ mensaje: 'Proveedor agregado exitosamente'});
                
            });
    });
});



export default rutaProveedores;