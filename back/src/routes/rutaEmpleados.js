import express from "express"
import bcrypt from "bcryptjs";


const rutaEmpleado = express.Router();

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


rutaEmpleado.get("leer",(req,res)=>{
    req.getConnection((error,conexion)=>{
        error? res.status(500).json({error:'Error en conexion con la base de datos'})
        :conexion.query("SELECT * FROM empleados",(err,resultado)=>{
            err? res.status(400).json({err:'tabla no encontrada'})
            :res.send(resultado)
        });
    });
});

rutaEmpleado.put("actualizar",async(req,res)=>{
    const nombre = String(req.body.nombre);
    const apellido = String(req.body.apellido);
    const contra = String(req.body.contra);
    const correo = String(req.body.correo);
    const rol = parseInt(req.body.rol);
    const encriptacion = await bcrypt.hash(contra, 8);
    
});

export default rutaEmpleado;