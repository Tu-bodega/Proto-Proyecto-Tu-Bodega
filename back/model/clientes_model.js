function consulta(conexion, callback) {
    const consulta = 'SELECT * FROM clientes';
    conexion.query(consulta, (err, resultado) => {
        if (err) return callback(err, null);
        return callback(null, resultado)
    });
};

function validarClient(conexion, datos, validar, callback) {
    let consulta
    validar === true ? consulta = '(documento_cliente = ? OR correo_cliente = ? OR telefono_cliente = ?) AND id != ?':
    consulta = '(documento_cliente = ? OR correo_cliente = ? OR telefono_cliente = ?)'
    conexion.query(`SELECT * FROM clientes WHERE ${consulta} `, datos, (err, resultado) => {
        if (err) return callback(err, null);
        return callback(null, resultado);
    });
};

function insertarClient(conexion, datos, callback) {
    const consulta = 'nombre_cliente, apellido_cliente, documento_cliente, correo_cliente, telefono_cliente, direccion_cliente';
    conexion.query(`INSERT INTO clientes (${consulta}) VALUES (?, ?, ?, ?, ?, ?)`, datos, (err, resultado) => {
        if (err) { return callback(err, null) };
        return callback(null, resultado);
    });
};

function actualizarClient(conexion, datos, callback) {
    const consulta = `nombre_cliente = ?, apellido_cliente = ?, documento_cliente = ?, correo_cliente = ?, telefono_cliente = ?, direccion_cliente = ? WHERE id =?`
    conexion.query(`UPDATE clientes SET ${consulta}`, datos, (err, resultado) => {
        if (err) { return callback(err, null) };
        return callback(null, resultado);
    });
};

function eliminarClient(conexion, id, callback) {
    conexion.query(`DELETE FROM clientes WHERE id = ?`, [id], (err, resultado) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, resultado);
    });
};

export { consulta, insertarClient, validarClient, actualizarClient, eliminarClient };