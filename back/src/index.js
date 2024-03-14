import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import myCon from "express-myconnection";
import cors from "cors";
import swaggerJSDOCs from "../swagger.js";
import configPuerto from "./configuraciones/configPuerto.js";
import configDb from "./configuraciones/configDataBase.js";
import rutaProductos from "./routes/productos.routes.js";
import rutaEmpleado from "./routes/empleados.routes.js";
import rutaProveedores from "./routes/proveedores.routes.js";
import rutaClientes from "./routes/clientes.routes.js";
import unidadMeida from "./routes/unidadMedida.routes.js";

const app = express();

app.use('/uploads', express.static('uploads'));
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
app.use("/clientes", rutaClientes);
app.use("/productos", rutaProductos);
app.use("/productos", unidadMeida);
app.use("/proveedores", rutaProveedores);

