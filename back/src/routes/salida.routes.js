import express from "express";

const rutaSalida = express.Router();


rutaSalida.post("/agregar", (req, res) => {
    const fecha = req.body.fecha;
    const idClient = parseInt(req.body.idCliente);
    const idEmpleado = parseInt(req.body.idUser);

    req.getConnection((errors, conexion) => {
        if (errors) return res.status(500).json({ errors: 'no hay conexion con la base de datos' });
        conexion.query(`INSERT INTO salidas (fecha_salida, clientes_id, empleados_id) VALUES (?, ?, ?)`,
            [fecha, idClient, idEmpleado], (err, respuesta) => {
                if (err) return res.status(400).json({ err: 'error en la consulta' });
                conexion.query(`SELECT LAST_INSERT_ID() as id`, (err, rows) => {
                    if (err) return res.status(400).json({ err: 'error al recuperar el ID de la salida' });
                    // Retorna el ID de la salida recién creada
                    res.status(200).json({ mensaje: 'Inserción exitosa', idSalida: rows[0].id });
                });
            });
    });
});

rutaSalida.post("/agregar/svsp", (req, res) => {
    const idSalida = req.body.idsalida;
    if (isNaN(idSalida)) {
        return res.status(400).json({ error: 'El ID de salida es inválido' });
    }

    const productosSeleccionados = req.body.productos;

    req.getConnection((errors, conexion) => {
        if (errors) {
            return res.status(500).json({ errors: 'no hay conexion con la base de datos' });
        }

        // Inicia una transacción
        conexion.beginTransaction(err => {
            if (err) {
                return res.status(500).json({ err: 'Error al iniciar la transacción' });
            }

            const operaciones = productosSeleccionados.map(producto => {
                return new Promise((resolve, reject) => {
                    // Inserta cada producto en salida_vs_productos
                    conexion.query('INSERT INTO salida_vs_productos (salidas_id, productos_id, Unidades) VALUES (?, ?, ?)',
                        [idSalida, producto.id, producto.contadorActual], (err, respuesta) => {
                            if (err) {
                                return reject(err);
                            }
                            // Luego actualiza las unidades de producto
                            conexion.query('UPDATE productos SET unidades_producto = unidades_producto - ? WHERE id = ?',
                                [producto.contadorActual, producto.id], (err, resultado) => {
                                    if (err) {
                                        return reject(err);
                                    }
                                    resolve();
                                });
                        });
                });
            });

            Promise.all(operaciones).then(() => {
                conexion.commit(err => {
                    if (err) {
                        return conexion.rollback(() => {
                            res.status(500).json({ err: 'Error al realizar el commit de la transacción' });
                        });
                    }
                    res.status(200).json({ mensaje: 'La salida y la actualización de productos se realizaron exitosamente' });
                });
            }).catch(error => {
                console.error("Error específico:", error); // Imprime el error específico en la consola
                conexion.rollback(() => {
                    res.status(500).json({ error: 'Error durante la operación de inserción o actualización', detalles: error.message });
                });
            });
        });
    });
});

rutaSalida.get("/registro", (req, res) => {
    req.getConnection((errorConexion, conexion) => {
        if (errorConexion) {
            return res.status(500).json({ error: 'No hay conexión con la base de datos' });
        }
        const consultaSQL = `
            SELECT 
                s.id AS 'salidas_id',
                s.fecha_salida,
                c.nombre_cliente,
                e.nombre_empleado,
                GROUP_CONCAT(p.nombre_producto SEPARATOR ', ') AS 'productos',
                GROUP_CONCAT(p.descripcion_producto SEPARATOR '; ') AS 'descripciones',
                GROUP_CONCAT(svp.Unidades SEPARATOR '; ') AS 'Unidades'
            FROM 
                salida_vs_productos svp
            INNER JOIN 
                salidas s ON svp.salidas_id = s.id
            INNER JOIN 
                clientes c ON s.clientes_id = c.id
            INNER JOIN 
                empleados e ON s.empleados_id = e.id
            INNER JOIN 
                productos p ON svp.productos_id = p.id
            GROUP BY 
                s.id, s.fecha_salida, c.nombre_cliente, e.nombre_empleado
            ORDER BY 
                s.id;
        `;
        conexion.query(consultaSQL, (errorConsulta, respuesta) => {
            if (errorConsulta) {
                return res.status(500).json({ error: 'Error en la consulta a la base de datos', detalle: errorConsulta.message });
            }
            res.status(200).json({ mensaje: 'Consulta exitosa', datos: respuesta });
        });
    });
});


export default rutaSalida; 