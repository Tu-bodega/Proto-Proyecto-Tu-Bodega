import express from "express";
import { leerCliente, crearCliente, actualizarCliente, eliminarCliente } from "../controller/clientes_controller.js"; 


const clientesRoutes = express.Router();


clientesRoutes.get('/leer', leerCliente);
clientesRoutes.post('/crear', crearCliente);
clientesRoutes.put('/actualizar', actualizarCliente);
clientesRoutes.delete('/eliminar/:id', eliminarCliente)




export default clientesRoutes;