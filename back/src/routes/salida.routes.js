import express from "express";

/**
@swagger
 * components:
 *   schemas:
 *     salida:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Id autogenerado en la base de datos
 *         nombre_producto:
 *           type: string
 *           description: Nombre del producto
 *         descripcion_producto:
 *           type: string
 *           description: Descripción del producto
 *         unidades_producto:
 *           type: integer
 *           description: Número de unidades del producto
 *         proveedores_id:
 *           type: integer
 *           description: Llave foranea tabla proveedores
 *         precio_compra_producto:
 *           type: integer
 *           description: Precio de compra del producto
 *         precio_venta_producto:
 *           type: integer
 *           description: Precio de venta del producto
 
 *       required:
 *         - nombre_producto
 *         - descripcion_producto
 *         - unidades_producto
 *         - proveedores_id
 *         - precio_compra_producto
 *         - precio_venta_producto
 *       example:
 *         nombre_producto: cerveza Corona
 *         descripcion_producto: cerveza de importación
 *         proveedores_id: 1
 *         unidades_producto: 60
 *         precio_compra_producto: 2500
 *         precio_venta_producto: 3000
 */


/**
 * @swagger
 * /salida/agregar:
 *   post:
 *     summary: Agrega una nueva salida
 *     tags: [Salida]
 *     description: Agrega una nueva salida al sistema con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/salida'
 *     responses:
 *       200:
 *         description: Inserción exitosa, devuelve el ID de la salida creada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje indicando que la inserción fue exitosa.
 *                 idSalida:
 *                   type: integer
 *                   description: El ID de la salida recién creada.
 *       400:
 *         description: Error en la consulta o en la recuperación del ID de la salida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *                   description: Descripción del error.
 *       500:
 *         description: Error de conexión con la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   description: Descripción del error de conexión.
 */

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

/**
 * @swagger
 * /salida/agregar/svsp:
 *   post:
 *     summary: Agrega una salida con productos seleccionados
 *     tags: [Salida]
 *     description: Agrega una nueva salida en la base de datos junto con los productos seleccionados, actualizando las unidades disponibles de los productos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idsalida:
 *                 type: integer
 *                 description: ID de la salida.
 *               productos:
 *                 type: array
 *                 description: Lista de productos seleccionados para la salida.
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del producto.
 *                     contadorActual:
 *                       type: integer
 *                       description: Cantidad de unidades del producto seleccionadas.
 *             required:
 *               - idsalida
 *               - productos
 *             example:
 *               idsalida: 1
 *               productos:
 *                 - id: 1
 *                   contadorActual: 5
 *                 - id: 2
 *                   contadorActual: 3
 *     responses:
 *       200:
 *         description: Salida y actualización de productos realizadas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: La salida y la actualización de productos se realizaron exitosamente.
 *       400:
 *         description: Error en la solicitud o datos de entrada inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: El ID de salida es inválido.
 *       500:
 *         description: Error en la conexión con el servidor o error durante la transacción.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error durante la operación de inserción o actualización.
 */


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

/**
 * @swagger
 * /rutaSalida/registro:
 *   get:
 *     summary: Obtener registros de salidas
 *     tags: [Salida]
 *     description: Obtiene información detallada sobre las salidas registradas en la base de datos, incluyendo los productos asociados a cada salida.
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve información detallada sobre las salidas registradas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Consulta exitosa
 *                 datos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       salidas_id:
 *                         type: integer
 *                         description: ID de la salida.
 *                       fecha_salida:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de la salida.
 *                       nombre_cliente:
 *                         type: string
 *                         description: Nombre del cliente asociado a la salida.
 *                       nombre_empleado:
 *                         type: string
 *                         description: Nombre del empleado asociado a la salida.
 *                       productos:
 *                         type: string
 *                         description: Lista de nombres de productos separados por coma.
 *                       descripciones:
 *                         type: string
 *                         description: Descripciones de los productos separadas por punto y coma.
 *                       Unidades:
 *                         type: string
 *                         description: Cantidad de unidades de cada producto asociado a la salida.
 *       500:
 *         description: Error en la consulta a la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error en la consulta a la base de datos
 *                 detalle:
 *                   type: string
 *                   example: Detalle específico del error en la consulta.
 */

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