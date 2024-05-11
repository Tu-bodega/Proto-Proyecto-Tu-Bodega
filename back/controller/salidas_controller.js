import { leerSal, crearSali, agregarSVSP } from "../model/salidas_model.js";

function leerSalida(req, res) {
    req.getConnection((error, conexion) => {
        if (error) return res.status(500).json({ error: "Error en conexión con base de datos" });
        leerSal(conexion, (err, resultado) => {
            if (err) return res.status(400).json({ err: 'error en la consulta con la base de datos' });
            res.status(200).json({ mensaje: 'Consulta exitosa', datos: resultado })
        });
    });
};



function crearSalida(req, res) {
    const { fecha, idClient, idEmpleado } = req.body
    req.getConnection((error, conexion) => {
        if (error) return res.status(500).json({ error: "Error en conexión con base de datos" });
        crearSali(conexion, fecha, idClient, idEmpleado, (err, resultado) => {
            if (err) return res.status(400).json({ err: 'error en la consulta con la base de datos' });
            res.status(200).json({ mensaje: 'Inserción exitosa', idSalida: resultado.insertId });
        });
    });
};

function agregarProductosSVSP(req, res) {
    const idSalida = req.body.idsalida;
    if (isNaN(idSalida)) {
        return res.status(400).json({ error: 'El ID de salida es inválido' });
    }

    const productosSeleccionados = req.body.productos;

    req.getConnection((errors, conexion) => {
        if (errors) return res.status(500).json({ errors: 'No hay conexión con la base de datos' });

        agregarSVSP(conexion, idSalida, productosSeleccionados)
            .then(resultado => {
                res.status(200).json(resultado);
            })
            .catch(error => {
                console.error("Error específico:", error);
                res.status(500).json(error);
            });
    });
};


export { crearSalida, agregarProductosSVSP, leerSalida };