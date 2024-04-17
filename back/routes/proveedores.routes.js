import express from "express";
import { leerProveedor, crearProveedor, actualizarProveedor, eliminarProveedor } from "../controller/proveedores_controller.js";


const proveedoresRoutes = express.Router();


proveedoresRoutes.get('/leer', leerProveedor);
proveedoresRoutes.post('/crear', crearProveedor);
proveedoresRoutes.put('/actualizar', actualizarProveedor);
proveedoresRoutes.delete('/eliminar/:id', eliminarProveedor)




export default proveedoresRoutes;