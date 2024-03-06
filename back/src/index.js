import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import myCon from "express-myconnection";
import cors from "cors";
import swaggerJSDOCs from "../swagger.js";
import configPuerto from "./configuraciones/configPuerto.js";
import configDb from "./configuraciones/configDataBase.js";
import rutaProductos from "./routes/rutaProductos.js";
import rutaEmpleado from "./routes/rutaEmpleados.js";
import rutaProveedores from "./routes/rutaProveedores.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(myCon(mysql, configDb.mysql,'single'));

app.listen(configPuerto.puerto, ()=>{
    console.info(`server escuchando en el puerto${configPuerto.puerto}/`);
    swaggerJSDOCs(app, configPuerto.puerto);
});

app.get("/",(req,res)=>{
    res.send(`Estoy en el puerto ${configPuerto.puerto}`)
});


app.use("/login", rutaEmpleado);
app.use("/empleados", rutaEmpleado);
app.use("/productos", rutaProductos);
app.use("/proveedores", rutaProveedores);

