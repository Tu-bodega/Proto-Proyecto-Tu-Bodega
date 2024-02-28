import express from "express"
import bcrypt from "bcryptjs";


const rutaEmpleado = express.Router();

rutaEmpleado.post("/validar", (req, res) => {
    const rol = parseInt(req.body.rol);
    const correo = String(req.body.correo);
    const contra = String(req.body.contra); // Suponiendo que aquí se aplicaría la encriptación

    const consulta = 'SELECT * FROM empleados WHERE rol_empleados_id = ? AND correo_empleado = ? AND password_empleado = ?';

    req.getConnection((erro, validacion) => {
        if (erro) {
            return res.status(500).json({ error: 'Fallo la conexión con la base de datos' });
        }
        validacion.query(consulta, [rol, correo, contra], (err, linea) => {
            if (err) {
                return res.status(400).json({ error: 'Problema al consultar la base de datos' });
            }
            if (linea.length > 0) {
                res.json({ mensaje: 'Bienvenido', usuario: linea[0].nombre_empleado }); // Enviar usuario puede ser un riesgo de seguridad
            } else {
                // Aquí asumimos que si no hay coincidencias, los datos son incorrectos.
                res.status(404).json({ error: 'Usuario, correo o contraseña incorrectos.' });
            }
        });
    });
});



export default rutaEmpleado;