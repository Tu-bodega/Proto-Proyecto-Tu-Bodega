import express from "express";
import { leerEmpleado, crearEmpleado, actualizarEmpleado, eliminarEmpleado } from "../controller/empleados_controller.js";


const empleadosRoutes = express.Router();


empleadosRoutes.get('/leer', leerEmpleado);
empleadosRoutes.post('/crear', crearEmpleado);
empleadosRoutes.put('/actualizar', actualizarEmpleado);
empleadosRoutes.delete('/eliminar/:id', eliminarEmpleado);



export default empleadosRoutes;