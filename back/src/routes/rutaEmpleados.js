import express, { application } from "express"
import bcrypt from "bcryptjs";


const rutaEmpleado = express.Router();
/** 
*@swagger
*components:
*    schemas:
*        empleados:
*            type: object
*            properties:
*                id:
*                    type: integer
*                    description: Id autogenerado en la base de datos
*                nombre_empleado:
*                    type: string
*                    description: nombre del empleado
*                apellido_empleado:
*                    type: string
*                    description: apellido del empleado
*                password_empleado: 
*                    type: string
*                    description: contraseña de ingreso empleado
*                correo_empleado:
*                    type: string
*                    description: correo empleado
*                rol_empleados_id:
*                    type: integer
*                    description: llave foranea con tabla rol_empleados 1 para administrador 2 para cajero
*            required:
*                -   nombre_empleado
*                -   apellido_empleado
*                -   password_empleado
*                -   correo_empleado
*                -   rol_empleados_id
*            example:
*                nombre_empleado: camilo 
*                apellido_empleado: castillo
*                password_empleado: Contraseña12345
*                correo_empleado: camil-code@gmail.com
*                rol_empleados_id: 1
*/

/**
 * @openapi
 * /empleados//leer:
 *   get:
 *     summary: Lee todos los empleados
 *     tags: [empleados]
 *     description: Obtiene una lista de todos los empleados de la base de datos.
 *     responses:
 *       200:
 *         description: Una lista de empleados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: El ID único del empleado.
 *                   nombre:
 *                     type: string
 *                     description: El nombre del empleado.
 *                   correo:
 *                     type: string
 *                     description: El correo electrónico del empleado.
 *                   cargo:
 *                     type: string
 *                     description: El cargo del empleado en la empresa.
 *       400:
 *         description: Tabla no encontrada o error en la consulta.
 *       500:
 *         description: Error en conexión con la base de datos.
 */

rutaEmpleado.get("/leer",(req,res)=>{
    req.getConnection((error,conexion)=>{
        error? res.status(500).json({error:'Error en conexion con la base de datos'})
        :conexion.query("SELECT * FROM empleados",(err,resultado)=>{
            err? res.status(400).json({err:'tabla no encontrada'})
            :res.send(resultado)
        });
    });
});

/**
* @swagger
* /empleados/validar:
*   post:
*     summary: Valida las credenciales del empleado.
*     tags: [empleados]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               rol:
*                 type: integer
*                 description: El ID del rol del empleado.
*               correo:
*                 type: string
*                 description: El correo electrónico del empleado.
*               contra:
*                 type: string
*                 description: La contraseña del empleado.
*             required:
*               - rol
*               - correo
*               - contra
*     responses:
*       200:
*         description: Autenticación exitosa, saludos al empleado.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 saludos:
*                   type: string
*                   description: Nombre del empleado.
*                 mensaje:
*                   type: string
*                   description: Mensaje de bienvenida.
*       401:
*         description: Autenticación fallida debido a credenciales inválidas.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: Mensaje de error indicando credenciales incorrectas.
*       500:
*         description: Error de conexión con la base de datos.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: Mensaje de error indicando fallo en la conexión.
*/



rutaEmpleado.post("/validar", (req, res) => {
    const rol = parseInt(req.body.rol);
    const correo = String(req.body.correo);
    const contra = String(req.body.contra); // La contraseña que se comparará.
    const consulta = 'SELECT * FROM empleados WHERE rol_empleados_id = ? AND correo_empleado = ?';

    req.getConnection((error, validacion) => {
        if (error) {
            return res.status(500).json({ error: 'Fallo la conexión con la base de datos' });
        }
        validacion.query(consulta, [rol, correo], (err, resultados) => {
            if (err) {
                return res.status(400).json({ error: 'Problema al consultar la base de datos' });
            }

            if (resultados.length > 0) {
                // comparación de contraseñas 
                const compareContra = bcrypt.compareSync(contra, resultados[0].password_empleado); 
                if (compareContra) {
                    res.json({
                        saludos: resultados[0].nombre_empleado, 
                        mensaje: 'Bienvenido',
                    });
                } else {
                    // Si la contraseña no coincide
                    res.status(401).json({ error: 'Usuario, correo o contraseña incorrectos.' }); // Código de estado cambiado a 401
                }
            } else {
                // Si no hay resultados de la base de datos
                res.status(401).json({ error: 'Usuario, correo o contraseña incorrectos.' }); // Código de estado cambiado a 401
            }
        });
    });
});


/**
* @swagger
* /empleados/crear:
*   post:
*     summary: Crea un nuevo empleado.
*     tags: [empleados]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               nombre:
*                 type: string
*                 description: El nombre del empleado.
*               apellido:
*                 type: string
*                 description: El apellido del empleado.
*               contra:
*                 type: string
*                 description: La contraseña del empleado.
*               correo:
*                 type: string
*                 description: El correo electrónico del empleado.
*               rol:
*                 type: integer
*                 description: El ID del rol del empleado.
*             required:
*               - nombre
*               - apellido
*               - contra
*               - correo
*               - rol
*     responses:
*       201:
*         description: Usuario creado con éxito.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 mensaje:
*                   type: string
*                   description: Mensaje de éxito al crear el usuario.
*                 resultado:
*                   type: object
*                   description: Detalles del resultado de la inserción.
*       409:
*         description: Conflicto por correo electrónico ya registrado.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 mensaje:
*                   type: string
*                   description: Mensaje indicando que el correo ya está registrado.
*       500:
*         description: Error de conexión con la base de datos o error al verificar existencia del usuario.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: Mensaje de error indicando el problema.
*/


rutaEmpleado.post("/crear", async (req, res) => {
    const { nombre, apellido, contra, correo } = req.body;
    const rol = parseInt(req.body.rol);
    const encriptacion = await bcrypt.hash(contra, 8);

    // Primero, verificamos si ya existe un usuario con el mismo correo
    const consultaExistencia = `SELECT * FROM empleados WHERE correo_empleado = ?`;
    req.getConnection((error, conexion) => {
        if (error) {
            return res.status(500).json({ error: 'Error en conexión con base de datos' });
        }
        conexion.query(consultaExistencia, [correo], async (err, resultados) => {
            if (err) {
                return res.status(500).json({ error: 'Error al verificar existencia del usuario' });
            }
            if (resultados.length > 0) {
                // Si encontramos al menos un resultado, significa que el correo ya está registrado
                return res.status(409).json({ mensaje: 'El correo ya está registrado. Por favor, use otro correo.' });
            } else {
                // Si no encontramos un usuario existente, procedemos a insertar el nuevo usuario
                const consult = `INSERT INTO empleados (nombre_empleado, apellido_empleado, password_empleado, correo_empleado, rol_empleados_id) VALUES (?, ?, ?, ?, ?)`;
                conexion.query(consult, [nombre, apellido, encriptacion, correo, rol], (err, resultado) => {
                    if (err) {
                        return res.status(400).json({ error: 'Error en inserción de datos' });
                    }
                    return res.status(201).send({ mensaje: "Usuario agregado con éxito", resultado });
                });
            }
        });
    });
});





export default rutaEmpleado;