import express from "express"

/**
 * @swagger
 * components:
 *   schemas:
 *     UnidadMedida:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado en la base de datos
 *         nombre:
 *           type: string
 *           description: Nombre de la unidad de medida
 *         descripcion:
 *           type: string
 *           description: Descripción de la unidad de medida
 *       required:
 *         - nombre
 *         - descripcion
 *       example:
 *         nombre: litro
 *         descripcion: Unidad de medida para volumen
 
 * /unidadmedida/unimedida:
 *   get:
 *     summary: Obtiene todas las unidades de medida
 *     tags: [Unidad de medida]
 *     description: Obtiene una lista de todas las unidades de medida de la base de datos.
 *     responses:
 *       200:
 *         description: Lista de unidades de medida obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UnidadMedida'
 *       400:
 *         description: Error en la consulta a la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 *       500:
 *         description: Error de conexión con la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error de conexión
 */


const unidadMeida = express.Router();

unidadMeida.get("/unimedida", (req,res) => {
    req.getConnection((error, conexion)=>{
        if (error) return res.status(500).json({error: "error de conexion con la base de datos"});
        conexion.query("SLECT * FROM unidades_meida", (er,resultado) => {
            if(err) return res.status(400).json({err: "error en la consulta"});
            res.status(200).json({mensaje: "consulta exitosa"})
        });
    });
});


export default unidadMeida;