import express from "express";

const rutaProveedores = express.Router();

/** 
@swagger
*components:
*    schemas:
*        proveedores:
*            type: object
*            properties:
*                id:
*                    type: integer
*                    description: Id autogenerado en la base de datos
*                nit_proveedor:
*                    type: string
*                    description: nit del proveedor
*                nombre_proveedor:
*                    type: string
*                    description: nombre del proveedor
*                correo_proveedor: 
*                    type: string
*                    description: correo del proveedor
*                direccion del provedor:
*                    type: string
*                    description: direccion del proveedor
*                telefono_proveedor:
*                    type: string
*                    description: telefono del proveedor
*            required:
*                -   nit_proveedor
*                -   nombre_proveedor
*                -   correo_proveedor
*                -   direccion_provedor
*                -   telefono_proveedor
*            example:
*                nit_proveedor: 9-0876899
*                nombre_proveedor: Jaime
*                correo_proveedor: jaime@hotmail.com
*                direccion_provedor: avenida siempre viva 123
*                telefono_proveedor: 318675462
*/

/**
 * @swagger
 * /proveedores/leer:
 *   get:
 *     summary: Lee todos los proveedores
 *     tags: [Proveedores]
 *     description: Obtiene una lista de todos los proveedores de la base de datos.
 *     responses:
 *       200:
 *         description: Una lista de proveedores.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: El ID único del proveedor, autogenerado en la base de datos.
 *                   nit_proveedor:
 *                     type: string
 *                     description: El NIT del proveedor.
 *                   nombre_proveedor:
 *                     type: string
 *                     description: El nombre del proveedor.
 *                   correo_proveedor:
 *                     type: string
 *                     description: El correo electrónico del proveedor.
 *                   direccion_proveedor:
 *                     type: string
 *                     description: La dirección del proveedor.
 *                   telefono_proveedor:
 *                     type: string
 *                     description: El teléfono del proveedor.
 *       400:
 *         description: Tabla no encontrada o error en la consulta.
 *       500:
 *         description: Error en conexión con la base de datos.
 */

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
        });
    });
});

/**
 * @swagger
 * /proveedores/crear:
 *   post:
 *     summary: Crea un nuevo proveedor
 *     tags: [Proveedores]
 *     description: Agrega un nuevo proveedor a la base de datos, asegurándose de que el NIT, correo, dirección y teléfono sean únicos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nit:
 *                 type: string
 *                 description: NIT del proveedor, debe ser único.
 *               nombre:
 *                 type: string
 *                 description: Nombre del proveedor.
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del proveedor, debe ser único.
 *               direccion:
 *                 type: string
 *                 description: Dirección del proveedor, debe ser única.
 *               telefono:
 *                 type: string
 *                 description: Teléfono del proveedor, debe ser único.
 *             required:
 *               - nit
 *               - nombre
 *               - correo
 *               - direccion
 *               - telefono
 *             example:
 *               nit: "123456789"
 *               nombre: "Proveedor SA"
 *               correo: "contacto@proveedorsa.com"
 *               direccion: "Calle 123 #45-67"
 *               telefono: "3216549870"
 *     responses:
 *       200:
 *         description: Proveedor agregado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Proveedor agregado exitosamente.
 *       400:
 *         description: Error en la consulta o datos de entrada inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error en la consulta o datos de entrada inválidos.
 *       409:
 *         description: Conflicto, el NIT, correo, dirección o teléfono ya están registrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: El NIT/correo/dirección/teléfono ya está registrado.
 *       500:
 *         description: Fallo conexión con el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Fallo conexión con el servidor.
 */


rutaProveedores.post("/crear", (req, res) => {
    const consulta = 'nit_proveedor, nombre_proveedor, correo_proveedor, direccion_proveedor, telefono_proveedor';

    const nit = req.body.nit;
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;

    // Aquí podrías añadir validaciones para los datos recibidos

    req.getConnection((error, conexion) => {
        if (error) {
            return res.status(500).json({ error: 'Fallo conexión con el servidor' });
        }
        conexion.query(`INSERT INTO proveedores (${consulta}) VALUES (?, ?, ?, ?, ?)`,
            [nit, nombre, correo, direccion, telefono],
            (err, resultado) => {
                if (err) {
                    return res.status(400).json({ error: 'Tabla no encontrada o error en la consulta' });
                }
                res.status(200).json({ mensaje: 'Proveedor agregado exitosamente', id: resultado.insertId });
            });
    });
});


/**
 * @swagger
 * /proveedores/actualizar:
 *   put:
 *     summary: Actualiza un proveedor existente
 *     tags: [Proveedores]
 *     description: Actualiza la información de un proveedor existente en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: El ID único del proveedor que se va a actualizar.
 *               nit:
 *                 type: string
 *                 description: El NIT actualizado del proveedor.
 *               nombre:
 *                 type: string
 *                 description: El nombre actualizado del proveedor.
 *               correo:
 *                 type: string
 *                 description: El correo electrónico actualizado del proveedor.
 *               direccion:
 *                 type: string
 *                 description: La dirección actualizada del proveedor.
 *               telefono:
 *                 type: string
 *                 description: El teléfono actualizado del proveedor.
 *             required:
 *               - id
 *               - nit
 *               - nombre
 *               - correo
 *               - direccion
 *               - telefono
 *             example:
 *               id: 1
 *               nit: "900123456-7"
 *               nombre: "Proveedor Actualizado S.A."
 *               correo: "contactoactualizado@proveedorsa.com"
 *               direccion: "Calle 123 Actualizada #45-67"
 *               telefono: "3216549871"
 *     responses:
 *       200:
 *         description: Proveedor actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Proveedor actualizado exitosamente
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
 *         description: Proveedor no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Proveedor no encontrado
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

rutaProveedores.put("/actualizar", (req, res) => {
    
    const id = parseInt(req.body.id);
    const nit = req.body.nit;
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;
    const consult = `UPDATE proveedores SET nit_proveedor=?, nombre_proveedor=?,
    correo_proveedor=?, direccion_proveedor=?, telefono_proveedor=? WHERE id=?`;

    req.getConnection((error, conexion)=>{
        if(error){
            return res.status(500).json({error: 'Fallo conexión con el servidor'});
        }
        conexion.query(consult,[nit, nombre, correo, direccion, telefono, id],(err,datos)=>{
            if(err){
                return res.status(400).json({err:'Tabla no encontrada o error en la consulta'});
            }
            res.status(200).json({mensaje: 'Proveedor actualizado exitosamente'})
        })
    })
})

/**
 * @swagger
 * /proveedores/eliminar/{id}:
 *   delete:
 *     summary: Elimina un proveedor existente
 *     tags: [Proveedores]
 *     description: Elimina un proveedor de la base de datos mediante su ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: El ID único del proveedor que se va a eliminar.
 *             required:
 *               - id
 *             example:
 *               id: 1
 *     responses:
 *       200:
 *         description: Proveedor eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Proveedor eliminado exitosamente
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
 *         description: Proveedor no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Proveedor no encontrado
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
rutaProveedores.delete("/eliminar/:id", (req, res) => {
    const id = parseInt(req.params.id)
    req.getConnection((error, conexion) => {
        if (error) {
            return res.status(500).json({ error: 'Fallo conexión con el servidor' });
        }
        conexion.query(`DELETE FROM proveedores WHERE id = ?`, [id], (err, resultado) => {
            if (err) {
                return res.status(400).json({ error: 'Tabla no encontrada o error en la consulta' });
            }
            if (resultado.affectedRows === 0) {
                return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
            }
            res.status(200).json({ mensaje: 'Proveedor eliminado exitosamente' });
        });
    });
});


export default rutaProveedores;