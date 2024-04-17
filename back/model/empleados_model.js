
function consulta(conexion, callback) {
    const consulta = 'SELECT * FROM empleados';
    conexion.query(consulta, (err, resultado) => {
        if (err) return callback(err, null);
        return callback(null, resultado)
    });
};

async function verificarExistenciaUsuario(conexion, correo, callback, validar) {
    const consulta = `SELECT * FROM empleados WHERE correo_empleado = ?`;
    await conexion.query(consulta, [correo], (err, resultado) => {
        if (err) return callback(err, []);
        if (validar && resultado.length === 0) return callback(null, 0);
        return callback(null, resultado);
    });
};

async function insertarUsuario(conexion, nombre, apellido, correo, encriptacion, rol, callback) {
    const consulta = `INSERT INTO empleados (nombre_empleado, apellido_empleado, password_empleado, 
                        correo_empleado, rol_empleados_id) VALUES (?, ?, ?, ?, ?)`;
    await conexion.query(consulta, [nombre, apellido, encriptacion, correo, rol], (err, resultado) => {
        if (err) { return callback(err, null) };
        return callback(null, resultado);
    });
};

async function actualizarUsuario(conexion, consulta, datos, callback) {
    await conexion.query(`UPDATE empleados SET ${consulta} WHERE id = ?`, datos, (err, resultado) => {
        if (err) { return callback(err, null) };
        return callback(null, resultado);
    });
};

function eliminarUsuario(conexion, id, callback) {
    conexion.query(`DELETE FROM empleados WHERE id = ?`, [id], (err, resultado) => {
        if (err) {
            return callback('Error al eliminar usuario de la base de datos', null);
        }
        return callback(null, resultado);
    });
};

export { consulta, verificarExistenciaUsuario, insertarUsuario, actualizarUsuario, eliminarUsuario };
