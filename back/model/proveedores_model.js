function consulta(conexion, callback) {
    const consulta = 'SELECT * FROM proveedores';
    conexion.query(consulta, (err, resultado) => {
        if (err) return callback(err, null);
        return callback(null, resultado)
    });
};

function validarProv(conexion, datos, valid, callback) {
    let consulta
    valid === true ? consulta = `(nit_proveedor = ? OR nombre_proveedor = ? OR correo_proveedor = ? 
                        OR direccion_proveedor = ? OR telefono_proveedor = ?) AND id != ?` :
        consulta = 'nit_proveedor = ? OR nombre_proveedor = ? OR correo_proveedor = ? OR direccion_proveedor = ? OR telefono_proveedor = ?';

    conexion.query(`SELECT * FROM proveedores WHERE ${consulta} `, datos, (err, resultado) => {
        if (err) return callback(err, null);
        return callback(null, resultado);
    });
};

function insertarProv(conexion, datos, callback) {
    const consulta = 'nit_proveedor, nombre_proveedor, correo_proveedor, direccion_proveedor, telefono_proveedor';
    conexion.query(`INSERT INTO proveedores (${consulta}) VALUES (?, ?, ?, ?, ?)`, datos, (err, resultado) => {
        if (err) { return callback(err, null) };
        return callback(null, resultado);
    });
};

function actualizarProv(conexion, datos, callback) {
    const consulta = `nit_proveedor=?, nombre_proveedor=?,
    correo_proveedor=?, direccion_proveedor=?, telefono_proveedor=? WHERE id=?`
    conexion.query(`UPDATE proveedores SET ${consulta}`, datos, (err, resultado) => {
        if (err) { return callback(err, null) };
        return callback(null, resultado);
    });
};

function eliminarProv(conexion, id, callback) {
    conexion.query(`DELETE FROM empleados WHERE id = ?`, [id], (err, resultado) => {
        if (err) {
            return callback('Error al eliminar usuario de la base de datos', null);
        }
        return callback(null, resultado);
    });
};

export { consulta, insertarProv, validarProv, actualizarProv, eliminarProv };