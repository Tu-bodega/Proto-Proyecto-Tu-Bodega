function leerSal(conexion, callback) {
    const consulta = `
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
    s.id;`;
    conexion.query(consulta, (err, respuesta) =>{
        if (err) return callback(err, null);
        callback(null, respuesta);
    });
};


function crearSali(conexion, fecha, cliente, empleado, callback) {
    const consulta = `INSERT INTO salidas (fecha_salida, clientes_id, empleados_id) VALUES (?, ?, ?)`;

    conexion.query(consulta, [fecha, cliente, empleado], (err, respuesta) => {
        if (err) return callback(err, null);
        callback(null, respuesta);
    });
};

function agregarSVSP(conexion, idSalida, productosSeleccionados) {
    return new Promise((resolve, reject) => {
        conexion.beginTransaction(err => {
            if (err) {
                return reject({ error: 'Error al iniciar la transacción' });
            }

            const operaciones = productosSeleccionados.map(producto => {
                return new Promise((resolve, reject) => {
                    conexion.query('INSERT INTO salida_vs_productos (salidas_id, productos_id, Unidades) VALUES (?, ?, ?)',
                        [idSalida, producto.id, producto.contadorActual], (err, respuesta) => {
                            if (err) return reject({ error: 'Error al insertar en salida_vs_productos', detalle: err });

                            conexion.query('UPDATE productos SET unidades_producto = unidades_producto - ? WHERE id = ?',
                                [producto.contadorActual, producto.id], (err, resultado) => {
                                    if (err) return reject({ error: 'Error al actualizar unidades en productos', detalle: err });
                                    resolve();
                                });
                        });
                });
            });

            Promise.all(operaciones).then(() => {
                conexion.commit(err => {
                    if (err) {
                        return conexion.rollback(() => {
                            reject({ error: 'Error al realizar el commit de la transacción' });
                        });
                    }
                    resolve({ mensaje: 'La salida y la actualización de productos se realizaron exitosamente' });
                });
            }).catch(error => {
                conexion.rollback(() => {
                    reject({ error: 'Error durante la operación de inserción o actualización', detalle: error });
                });
            });
        });
    });
};

export { leerSal, crearSali, agregarSVSP };