import bcrypt from 'bcryptjs';
import { consulta, verificarExistenciaUsuario, insertarUsuario, actualizarUsuario, eliminarUsuario } from '../model/empleados_model.js';
const mError = 'Error en la consulta';

function leerEmpleado(req, res) {
    req.getConnection((error, conexion) => {
        if (error) return res.status(500).json({ error: 'Fallo la conexión con la base de datos' });
        consulta(conexion, (err, resultado) => {
            if (err) return res.status(401).json({ err: mError });
            res.status(200).json(resultado);
        });
    });
};

async function crearEmpleado(req, res) {
    const { nombre, apellido, correo, contra, rol } = req.body;
    const encriptacion = await bcrypt.hash(contra, 8);

    req.getConnection(async (error, conexion) => {
        if (error) return res.status(500).json({ error: 'Error en conexión con base de datos' });
        verificarExistenciaUsuario(conexion, correo, (err, resultados) => {
            if (err) return res.status(400).json({ err: mError });
            if (resultados.length > 0) return res.status(409).json({ mensaje: 'El correo ya esta registrado por favor use otro correo' });
            insertarUsuario(conexion, nombre, apellido, correo, encriptacion, rol, (err, resultado) => {
                if (err) return res.status(500).json({ err: mError });
                res.status(200).json({ mensaje: 'Usuario creado con exito', resultado });
            });
        });
    });
};

async function actualizarEmpleado(req, res) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    const { nombre, apellido, correo, contra, rol, id, correoU, contraAdmi } = req.body;
    let consulta = `nombre_empleado = ?, apellido_empleado = ?, correo_empleado = ?, rol_empleados_id = ?`;
    let datos = [nombre, apellido, correo, rol, id];
    let valid = false;

    if (contra.length > 0) {
        if (!regex.test(contra)) return res.status(403).json({ mensaje: 'formato de contraseña incorrecto' });
        const encriptacion = await bcrypt.hash(contra, 8);
        consulta = `nombre_empleado = ?, apellido_empleado = ?, password_empleado = ?, correo_empleado = ?, rol_empleados_id = ?`;
        datos = [nombre, apellido, encriptacion, correo, rol, id];
    };

    req.getConnection(async (error, conexion) => {
        if (error) return res.status(500).json({ error: 'Error en conexión con base de datos' });
        verificarExistenciaUsuario(conexion, correoU, (err, resultados) => {
            if (err) return res.status(400).json({ err: mError + '1' });
            if (resultados.length === 0) return res.status(401).json({ mensaje: 'no se encontro usuario administrador' });
            const compareContra = bcrypt.compareSync(contraAdmi, resultados[0].password_empleado);
            if (!compareContra) return res.status(403).json({ mensaje: 'contraseña de administrador incorrecta' });
            verificarExistenciaUsuario(conexion, correo, (err, resultados) => {
                if (err) return res.status(400).json({ err: mError + '2' });
                if (resultados.length > 0) {
                    if (resultados[0].id != id || resultados.length === 0) return res.status(403).json({ mensaje: 'este correo ya existe' }); // Corrección aquí
                }
                actualizarUsuario(conexion, consulta, datos, (err, resultado) => {
                    if (err) return res.status(400).json({ err: mError + '3', err });
                    return res.status(200).json({ mensaje: 'Usuario actualiza con exito', resultado });
                });
            }, valid);
        });
    });
};


function eliminarEmpleado(req, res) {
    const id = parseInt(req.params.id);
    const correoU = req.query.correo;
    const contraAdmi = req.query.password;

    req.getConnection((error, conexion) => {
        if (error) {
            return res.status(500).json({ error: 'Fallo la conexión con la base de datos' });
        }

        verificarExistenciaUsuario(conexion, correoU, (err, resultados) => {
            if (err) {
                return res.status(400).json({ err: 'Error al verificar existencia de usuario', error: err });
            }
            if (resultados.length === 0) {
                return res.status(401).json({ mensaje: 'No se encontró usuario administrador' });
            }

            const compareContra = bcrypt.compareSync(contraAdmi, resultados[0].password_empleado);
            if (!compareContra) {
                return res.status(403).json({ mensaje: 'Contraseña de administrador incorrecta' });
            }

            eliminarUsuario(conexion, id, (err, resultados) => {
                if (err) {
                    return res.status(400).json({ err: 'Error al eliminar usuario', error: err });
                }
                res.status(200).json({ mensaje: 'Usuario eliminado', resultados });
            });
        });
    });
}


export { leerEmpleado, crearEmpleado, actualizarEmpleado, eliminarEmpleado };