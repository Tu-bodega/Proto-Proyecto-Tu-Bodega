function consulta(conexion, callback) {
    const consulta = `SELECT p.id,p.nombre_producto, p.descripcion_producto,
    p.precio_venta_producto,p.precio_compra_producto,
    p.unidades_producto,p.fecha_producto, p.ruta_imagen,
    u.nombre_unidaded_medida, np.nombre_proveedor
    FROM productos p
    INNER JOIN
    unidades_medida u ON p.unidades_medida_id = u.id
    INNER JOIN
    proveedores np ON proveedores_id = np.id`
    conexion.query(`${consulta}`, (err, respuesta) => {
        if (err) return callback(err, null);
        callback(null, respuesta);
    });
};
function crearPro(conexion, datos, callback) {
    const consulta = `(nombre_producto, descripcion_producto, precio_compra_producto, 
        precio_venta_producto, unidades_producto, fecha_producto, unidades_medida_id,
        proveedores_id, ruta_imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    conexion.query(`INSERT INTO productos ${consulta}`, datos, (err, respuesta) => {
        if (err) return callback(err, null);
        callback(null, respuesta);
    });
};

function validarPro(conexion, datos, valid, callback) {
    let consulta;
    valid === true ?
        consulta = `(nombre_producto = ?) AND id != ?` :
        consulta = `nombre_producto = ?`;
    console.log(datos);
    conexion.query(`SELECT * FROM productos WHERE ${consulta}`, datos, (err, respuesta) => {
        if (err) return callback(err, null);
        return callback(null, respuesta);
    });
};

function actualizarPro(conexion, datos, callback) {
    const consulta = `nombre_producto = ?, descripcion_producto = ?, precio_compra_producto = ?, 
    precio_venta_producto = ?, unidades_producto = ?, fecha_producto = ?, unidades_medida_id = ?,
    proveedores_id = ?, ruta_imagen = ?`;

    conexion.query(`UPDATE productos SET ${consulta}`, datos, (err, respuesta) => {
        if (err) return callback(err, null);
        return callback(null, respuesta);
    });
};

function eliminarPro(conexion, id, callback) {
    const consulta = `DELETE FROM productos WHERE id = ?`;

    conexion.query(consulta, id, (err, respuesta) => {
        if (err) return callback(err, null);
        return callback(null, respuesta)
    });
}


export { consulta, crearPro, validarPro, actualizarPro, eliminarPro };