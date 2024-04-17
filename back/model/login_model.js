import bcrypt from 'bcryptjs';

function validarUsuario(rol, correo, contra, validacion, callback) {
    const consulta = 'SELECT * FROM empleados WHERE rol_empleados_id = ? AND correo_empleado = ?';

    validacion.query(consulta, [rol, correo], (err, resultados) => {
        if (err) {
            return callback(err, null);
        }

        if (resultados.length > 0) {
            const compareContra = bcrypt.compareSync(contra, resultados[0].password_empleado);
            if (compareContra) {
                const usuario = {
                    idUser: resultados[0].id,
                    nombre: resultados[0].nombre_empleado,
                    correo: resultados[0].correo_empleado,
                    mensaje: 'Bienvenido',
                };
                return callback(null, usuario);
            } else {
                return callback({ error: 'usuario, correo o contraseña incorrectos.' }, null);
            }
        } else {
            return callback({ error: 'Usuario, correo o contraseña incorrectos.' }, null);
        }
    });
};


export default validarUsuario;