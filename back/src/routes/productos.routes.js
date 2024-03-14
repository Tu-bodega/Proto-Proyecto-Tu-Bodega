import express from "express";
import multer from "multer";

const rutaProductos = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');// Configura Multer para guardar archivos subidos en el directorio 'uploads/'
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);// Genera un nombre de archivo único agregando un timestamp al nombre original
    }
});
const upload = multer({ storage: storage });


/** 
@swagger
*components:
*    schemas:
*        productos:
*            type: object
*            properties:
*                id:
*                    type: integer
*                    description: Id autogenerado en la base de datos
*                nombre_producto:
*                    type: string
*                    description: nombre del producto
*                descripcion_producto:
*                    type: string
*                    description: descripcion del producto
*                precio_compra_producto: 
*                    type: integer
*                    description: precio de compra del producto
*                precio_venta_producto:
*                    type: integer
*                    description:  precio de venta del producto
*                unidades_producto:
*                    type: integer
*                    description: numero de unidades del producto
*                fecha_producto:
*                    type: date
*                    description: fecha de ingreso del producto
*                unidades_medida_id:
*                    type: integer
*                    description: llave foranea tabla unidad de medida,(1=mililitros,2=litros,3=gramos,4=kilogramos)
*                proveedores_id:
*                    type: integer
*                    description: llave foranea tabla proveedores
*            required:
*                -   nombre_producto
*                -   descripcion_producto
*                -   precio_compra_producto
*                -   precio_venta_producto
*                -   unidades_producto
*                -   fecha_producto
*                -   unidades_medida_id
*                -   proveedores_id
*            example:
*                nombre_producto: cerveza Corona
*                descripcion_producto: cerveza de importacion
*                precio_compra_producto: 2500
*                precio_venta_producto: 3000
*                unidades_producto: 60
*                fecha_producto: 2024-02-27
*                unidades_medida_id: 1
*                proveedores_id: 1
*/

/**
@swagger
* /productos/leer:
*   get:
*     summary: Obtiene todos los productos
*     tags: [productos]
*     description: "Retorna todos los productos de la base de datos. No requiere parámetros de entrada."
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
*                     id:
*                         type: integer
*                         description: Id autogenerado en la base de datos
*                     nombre_producto:
*                         type: string
*                         description: nombre del producto
*                     descripcion_producto:
*                         type: string
*                         description: descripcion del producto
*                     precio_compra_producto: 
*                         type: integer
*                         description: precio de compra del producto
*                     precio_venta_producto:
*                         type: integer
*                         description:  precio de venta del producto
*                     unidades_producto:
*                         type: integer
*                         description: numero de unidades del producto
*                     fecha_producto:
*                         type: date
*                         description: fecha de ingreso del producto
*                     unidades_medida_id:
*                         type: integer
*                         description: llave foranea tabla unidad de medida,(1=mililitros,2=litros,3=gramos,4=kilogramos)
*                     proveedores_id:
*                         type: integer
*                         description: llave foranea tabla proveedores
*       400:
*         description: Error en la consulta, tabla no encontrada.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 err:
*                   type: string
*                   description: Descripción del error de consulta.
*       500:
*         description: Error de conexión con el servidor.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: Mensaje indicando falla de conexión con el servidor.
*/

rutaProductos.get("/leer", (req, res) => {
    req.getConnection((error, conexion) => {
        if (error) {
            return res.status(500).json({ error: 'fallo conexion con el servidor' });
        }
        // Incluye un INNER JOIN para obtener el nombre de la unidad de medida
        const sqlQuery = `
            SELECT p.*, u.nombre_unidaded_medida, np.nombre_proveedor
            FROM productos p
            INNER JOIN 
            unidades_medida u ON p.unidades_medida_id  = u.id
            INNER JOIN
            proveedores np ON p.proveedores_id = np.id`;
        conexion.query(sqlQuery, (err, lineas) => {
            if (err) {
                return res.status(400).json({ err: 'Error al realizar la consulta', detalle: err.message });
            }
            res.send(lineas);
            console.log('consulta exitosa status 200');
        });
    });
});


/**
@swagger
* /productos/crear:
*   post:
*     summary: Agrega un nuevo producto
*     tags: [productos]
*     description: "Crea un nuevo producto en la base de datos con la información proporcionada en el cuerpo de la solicitud."
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               nombre:
*                 type: string
*                 description: Nombre del producto.
*               descripcion:
*                 type: string
*                 description: Descripción del producto.
*               precioC:
*                 type: number
*                 description: Precio de compra del producto.
*               precioV:
*                 type: number
*                 description: Precio de venta del producto.
*               unidades:
*                 type: integer
*                 description: Número de unidades del producto.
*               fecha:
*                 type: string
*                 format: date
*                 description: Fecha de ingreso del producto.
*               medida:
*                 type: integer
*                 description: ID de la unidad de medida del producto.
*               proveedor:
*                 type: integer
*                 description: ID del proveedor del producto.
*               imagen:
*                 type: string
*                 description: imagen del producto.
*             required:
*               - nombre
*               - descripcion
*               - precioC
*               - precioV
*               - unidades
*               - fecha
*               - medida
*               - proveedor
*               - imagen
*     responses:
*       200:
*         description: Producto agregado exitosamente.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 mensaje:
*                   type: string
*                   description: Mensaje de éxito.
*                 id:
*                   type: integer
*                   description: ID autogenerado del producto insertado.
*       400:
*         description: Error en la consulta, tabla no encontrada o datos inválidos.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: Descripción del error.
*       500:
*         description: Fallo conexión con el servidor.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: Mensaje indicando falla de conexión con el servidor.
*/

rutaProductos.post("/crear", upload.single('imagen'), (req, res) => {
    const { nombre, descripcion, precioC, precioV, unidades, fecha, medida, proveedor } = req.body;
    const precioCompra = parseFloat(precioC);
    const precioVenta = parseFloat(precioV);
    const imagen = req.file ? req.file.path : '';

    req.getConnection((error, conexion) => {
        if (error) {
            return res.status(500).json({ error: 'Fallo conexión con el servidor' });
        }
        const consulta = 'INSERT INTO productos (nombre_producto, descripcion_producto, precio_compra_producto, precio_venta_producto, unidades_producto, fecha_producto, unidades_medida_id, proveedores_id, ruta_imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        conexion.query(consulta,
            [nombre, descripcion, precioCompra, precioVenta, unidades, fecha, medida, proveedor, imagen],
            (err, resultado) => {
                if (err) {
                    return res.status(400).json({ error: 'Tabla no encontrada o error en la consulta' });
                }
                res.status(200).json({ mensaje: 'Producto agregado exitosamente', id: resultado.insertId });
            });
    });
});

/**
@swagger
* /productos/actualizar:
*   put:
*     summary: Actualiza un producto existente
*     tags: [productos]
*     description: "Actualiza los detalles de un producto existente en la base de datos. Se requiere el ID del producto para identificar el registro a actualizar."
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               id:
*                 type: integer
*                 description: ID del producto a actualizar.
*               nombre:
*                 type: string
*                 description: Nuevo nombre del producto.
*               descripcion:
*                 type: string
*                 description: Nueva descripción del producto.
*               precioCompra:
*                 type: number
*                 description: Nuevo precio de compra del producto.
*               precioVenta:
*                 type: number
*                 description: Nuevo precio de venta del producto.
*               unidades:
*                 type: integer
*                 description: Nueva cantidad de unidades del producto.
*               fecha:
*                 type: string
*                 format: date
*                 description: Nueva fecha de ingreso del producto.
*               unidadMedida:
*                 type: integer
*                 description: Nueva unidad de medida del producto.
*               proveedor:
*                 type: integer
*                 description: Nuevo proveedor del producto.
*             required:
*               - id
*               - nombre
*               - descripcion
*               - precioCompra
*               - precioVenta
*               - unidades
*               - fecha
*               - unidadMedida
*               - proveedor
*     responses:
*       200:
*         description: Producto actualizado exitosamente.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 mensaje:
*                   type: string
*                   description: Mensaje de éxito indicando que el producto ha sido actualizado.
*       400:
*         description: Error en la consulta, tabla no encontrada o datos inválidos.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 err:
*                   type: string
*                   description: Descripción del error en la consulta.
*       500:
*         description: Fallo conexión con el servidor.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: Mensaje indicando falla de conexión con el servidor.
*/



rutaProductos.put("/actualizar",(req,res)=>{
    const id = parseInt(req.body.id);
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precioCompra = parseFloat(req.body.precioCompra);
    const precioVenta = parseFloat(req.body.precioVenta);
    const unidades = req.body.unidades;
    const fecha = req.body.fecha; // Uso correcto de new Date
    const unidadMedida = req.body.unidadMedida;
    const proveedor = req.body.proveedor;
    const consult = `UPDATE productos SET nombre_producto=?, descripcion_producto=?,
    precio_compra_producto=?, precio_venta_producto=?, unidades_producto=?, fecha_producto=?, unidades_medida_id=?, proveedores_id=? WHERE id=?`;

    req.getConnection((error, conexion)=>{
        if(error){
            return res.status(500).json({error: 'Fallo conexión con el servidor'});
        }
        conexion.query(consult,[nombre, descripcion, precioCompra, precioVenta, unidades, fecha, unidadMedida, proveedor, id],(err,datos)=>{
            if(err){
                return res.status(400).json({err:'Tabla no encontrada o error en la consulta'});
            }
            res.status(200).json({mensaje: 'Producto actualizado exitosamente'})
        })
    })
})

/**
@swagger
* /productos/eliminar/{id}:
*   delete:
*     summary: Elimina un producto existente
*     tags: [productos]
*     description: "Elimina un producto de la base de datos utilizando el ID proporcionado como parámetro en la ruta."
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: ID del producto a eliminar.
*     responses:
*       200:
*         description: Producto eliminado exitosamente.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 mensaje:
*                   type: string
*                   description: Mensaje de éxito indicando que el producto ha sido eliminado.
*       400:
*         description: Error en la consulta, tabla no encontrada o error en la consulta.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 err:
*                   type: string
*                   description: Descripción del error ocurrido durante la operación.
*       500:
*         description: Fallo conexión con el servidor.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: Mensaje indicando falla de conexión con el servidor.
*/


rutaProductos.delete("/eliminar/:id",(req, res)=>{
    const id = parseInt(req.params.id);

    req.getConnection((error, conexion)=>{
        if(error){
            return res.status(500).json({error: 'Fallo conexión con el servidor'});
        }
        conexion.query('DELETE FROM productos WHERE id=?',[id],(err, resultado)=>{
            if(err){
                return res.status(400).json({err:'Tabla no encontrada o error en la consulta'});
            }
            res.status(200).json({mensaje: 'Producto eliminado exitosamente'})
        })
    })
    
})

export default rutaProductos;
