import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import myCon from "express-myconnection";
import cors from "cors";
import configPuerto from "./configuraciones/configPuerto.js";
import configDb from "./configuraciones/configDataBase.js";
import rutaProductos from "./routes/rutaProductos.js";
import rutaEmpleado from "./routes/rutaEmpleados.js";
import rutaProveedores from "./routes/rutaProveedores.js";

const app = express();

app.listen(configPuerto.puerto, ()=>{
    console.info(`http://localhost:${configPuerto.puerto}/`);
    console.info(`http://localhost:${configPuerto.puerto}/productos/leer`);
});

app.use(bodyParser.json());
app.use(cors());
app.use(myCon(mysql, configDb.mysql,'single'));


app.get("/",(req,res)=>{
    res.send(`Estoy en el puerto ${configPuerto.puerto}`)
});


app.use("/login", rutaEmpleado);
app.use("/empleados", rutaEmpleado);
app.use("/productos", rutaProductos);
app.use("/proveedores", rutaProveedores);