import express from "express";

/** 
@swagger
*components:
*    schemas:
*        clientes:
*            type: object
*            properties:
*                id:
*                    type: integer
*                    description: Id autogenerado en la base de datos
*                nombre_cliente:
*                    type: string
*                    description: nombre del cliente
*                apellido_cliente:
*                    type: string
*                    description: apellido del cliente
*                documento_cliente:
*                    type: number
*                    description: documento del cliente     
*                correo_cliente: 
*                    type: string
*                    description: correo del cliente
*                telefono_cliente:
*                    type: number
*                    description: telefono del cliente
*                direccion_cliente:
*                    type: string
*                    description: direccion del cliente
*            required:
*                -   nombre_cliente
*                -   apellido_cliente
*                -   documento_cliente
*                -   correo_cliente
*                -   telefono_cliente
*                -   direccion_cliente
*            example:
*                nombre_cliente: Carlos
*                apellido_cliente: monsalve
*                documento_cliente: 102937465
*                correo_cliente: carlos@hotmail.com
*                telefono_cliente: 318675462
*                direccion_cliente: avenida siempre viva 123
*/

/**
 * @swagger
 * /clientes/leer:
 *   get:
 *     summary: Lee todos los clientes
 *     tags: [clientes]
 *     description: Obtiene una lista de todos los clientes de la base de datos.
 *     responses:
 *       200:
 *         description: Una lista de clientes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: El ID único del cliente, autogenerado en la base de datos.
 *                   nombre_cliente:
 *                     type: string
 *                     description: El nombre del cliente.
 *                   apellido_cliente:
 *                     type: string
 *                     description: El apellido del cliente.
 *                   documento_cliente:
 *                     type: number
 *                     description: El documento del cliente.
 *                   correo_cliente:
 *                     type: string
 *                     description: El correo electrónico del cliente.
 *                   telefono_cliente:
 *                     type: number
 *                     description: El teléfono del cliente.
 *                   direccion_cliente:
 *                     type: string
 *                     description: La dirección del cliente.
 *       400:
 *         description: Tabla no encontrada o error en la consulta.
 *       500:
 *         description: Error en conexión con la base de datos.
 */

const rutaClientes = express.Router();

rutaClientes.get("/leer", (req, res) => {
    req.getConnection((error, conexion) => {
        if (error) {
            return res.status(500).json({ error: 'fallo conexion con el servidor' });
        }
        conexion.query("SELECT * FROM clientes", (err, lineas) => {
            if (err) {
                return res.status(400).json({ err: 'Tabla no encontrada' });
            }
            res.send(lineas);
            console.log('consulta exitosa status 200');
        });
    });
});

/**
 * @swagger
 * /clientes/crear:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags: [clientes]
 *     description: Agrega un nuevo cliente a la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: El nombre del cliente.
 *               apellido:
 *                 type: string
 *                 description: El apellido del cliente.
 *               documento:
 *                 type: number
 *                 description: El documento del cliente.
 *               correo:
 *                 type: string
 *                 description: El correo electrónico del cliente.
 *               telefono:
 *                 type: number
 *                 description: El teléfono del cliente.
 *               direccion:
 *                 type: string
 *                 description: La dirección del cliente.
 *             required:
 *               - nombre
 *               - apellido
 *               - documento
 *               - correo
 *               - telefono
 *               - direccion
 *             example:
 *               nombre: "carlos"
 *               apellido: "monsalve"
 *               correo: "carlo@proveedorsa.com"
 *               telefono: "3216549870"
 *               direccion: "Calle 123 #45-67"
 *     responses:
 *       200:
 *         description: cliente agregado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: cliente agregado exitosamente
 *       400:
 *         description: Tabla no encontrada o error en la consulta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Tabla no encontrada o error en la consulta
 *       500:
 *         description: Fallo conexión con el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Fallo conexión con el servidor
 */

rutaClientes.post("/crear", (req, res) => {
    const consulta = 'nombre_cliente, apellido_cliente, documente_cliente, correo_cliente, telefono_cliente, direccion_cliente';

    const nombre = String(req.body.nombre);
    const apellido = String(req.body.apellido);
    const documento = String(req.body.documento);
    const correo = String(req.body.correo);
    const telefono = String(req.body.telefono);
    const direccion = String(req.body.direccion);
    

    // Aquí podrías añadir validaciones para los datos recibidos

    req.getConnection((error, conexion) => {
        if (error) {
            return res.status(500).json({ error: 'Fallo conexión con el servidor' });
        }
        conexion.query(`INSERT INTO clientes (${consulta}) VALUES (?, ?, ?, ?, ?)`,
            [nombre, apellido, documento, correo, telefono, direccion],
            (err, resultado) => {
                if (err) {
                    return res.status(400).json({ error: 'Tabla no encontrada o error en la consulta' });
                }
                res.status(200).json({ mensaje: 'Cliente agregado exitosamente' });

            });
    });
});

/**
 * @swagger
 * /clientes/actualizar:
 *   put:
 *     summary: Actualiza un cliente existente
 *     tags: [clientes]
 *     description: Actualiza la información de un cliente existente en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: El ID único del cliente que se va a actualizar.
 *               nombre:
 *                 type: string
 *                 description: El nombre actualizado del cliente.
 *               apellido:
 *                 type: string
 *                 description: El apellido actualizado del cliente.
 *               documento:
 *                 type: number
 *                 description: El documento actualizado del cliente.
 *               correo:
 *                 type: string
 *                 description: El correo electrónico actualizado del cliente.
 *               telefono:
 *                 type: number
 *                 description: El teléfono actualizado del cliente.
 *               direccion:
 *                 type: string
 *                 description: La dirección actualizada del cliente.
 *             required:
 *               - id
 *               - nombre
 *               - apellido
 *               - documento
 *               - correo
 *               - telefono
 *               - direccion
 *             example:
 *               id: 1
 *               nombre: "carlos"
 *               apellido: "monsalve"
 *               documento: "1241245345"
 *               correo: "contactoactualizado@proveedorsa.com"
 *               telefono: "3216549871"
 *               direccion: "Calle 123 Actualizada #45-67"
 *     responses:
 *       200:
 *         description: cliente actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: cliente actualizado exitosamente
 *       400:
 *         description: Tabla no encontrada o error en la consulta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Tabla no encontrada o error en la consulta
 *       404:
 *         description: cliente no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: cliente no encontrado
 *       500:
 *         description: Fallo conexión con el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Fallo conexión con el servidor
 */

rutaClientes.put("/actualizar", (req, res) => {
    const consultaActualizar = 'nombre_cliente = ?, apellido_cliente =?, documento_cliente, correo_proveedor = ?, telefono_proveedor = ?, direccion_proveedor = ?';
    const id = req.body.id; // El ID del cliente que quieres actualizar

    const nombre = String(req.body.nombre);
    const apellido = String(req.body.apellido);
    const documento = String(req.body.documento);
    const correo = String(req.body.correo);
    const telefono = String(req.body.telefono);
    const direccion = String(req.body.direccion);
    

    // Aquí podrías añadir validaciones para los datos recibidos

    req.getConnection((error, conexion) => {
        if (error) {
            return res.status(500).json({ error: 'Fallo conexión con el servidor' });
        }
        conexion.query(`UPDATE clientes SET ${consultaActualizar} WHERE id = ?`,
            [nombre, apellido, documento, correo, telefono, direccion, id],
            (err, resultado) => {
                if (err) {
                    return res.status(400).json({ error: 'Tabla no encontrada o error en la consulta' });
                }
                if (resultado.affectedRows === 0) {
                    return res.status(404).json({ mensaje: 'Cliente no encontrado' });
                }
                res.status(200).json({ mensaje: 'Cliente actualizado exitosamente' });
            });
    });
});

/**
 * @swagger
 * /clientes/eliminar:
 *   delete:
 *     summary: Elimina un cliente existente
 *     tags: [clientes]
 *     description: Elimina un cliente de la base de datos mediante su ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: El ID único del cliente que se va a eliminar.
 *             required:
 *               - id
 *             example:
 *               id: 1
 *     responses:
 *       200:
 *         description: cliente eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: cliente eliminado exitosamente
 *       400:
 *         description: Tabla no encontrada o error en la consulta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Tabla no encontrada o error en la consulta
 *       404:
 *         description: cliente no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: cliente no encontrado
 *       500:
 *         description: Fallo conexión con el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Fallo conexión con el servidor
 */

rutaClientes.delete("/eliminar/id", (req, res) => {
    const id = req.params.id; // El ID del proveedor que quieres eliminar

    req.getConnection((error, conexion) => {
        if (error) {
            return res.status(500).json({ error: 'Fallo conexión con el servidor' });
        }
        conexion.query(`DELETE FROM Clientes WHERE id = ?`, [id], (err, resultado) => {
            if (err) {
                return res.status(400).json({ error: 'Tabla no encontrada o error en la consulta' });
            }
            if (resultado.affectedRows === 0) {
                return res.status(404).json({ mensaje: 'Cliente no encontrado' });
            }
            res.status(200).json({ mensaje: 'Cliente eliminado exitosamente' });
        });
    });
});



export default rutaClientes;