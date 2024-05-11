import express from "express";
import { leerSalida, crearSalida, agregarProductosSVSP } from "../controller/salidas_controller.js";

const salidasRoutes = express.Router();

salidasRoutes.get('/leer', leerSalida);
salidasRoutes.post('/crear', crearSalida);
salidasRoutes.post("/crear/svsp", agregarProductosSVSP);

export default salidasRoutes;