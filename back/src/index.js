import expres from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import myConexion from "express-myconnection";
import cors from "cors";
import configPuerto from "../config/configPuerto.js";
import configDataBase from "../config/configDataBase.js";
import login from "../routes/login.routes.js";
import empleadosRoutes from "../routes/empleados.routes.js";
import proveedoresRoutes from "../routes/proveedores.routes.js";
import clientesRoutes from "../routes/clientes.routes.js";
import productosRoutes from "../routes/productos.routes.js";
import salidasRoutes from "../routes/salidas.routes.js";


const app = expres();

app.use(`/uploads`, expres.static(`uploads`));
app.use(bodyParser.json());
app.use(cors());
app.use(myConexion(mysql, configDataBase.db, 'single'));


app.listen(configPuerto.puerto, () => {
    console.info(`Servidor escuchando puerto: http://localhost:${configPuerto.puerto}/`)
});

app.get('/', (req, res) => {
    res.send(`Estoy en el puerto ${configPuerto.puerto}`);
});

app.use("/login", login);
app.use("/empleados",empleadosRoutes);
app.use("/proveedores",proveedoresRoutes);
app.use("/clientes",clientesRoutes);
app.use("/productos",productosRoutes);
app.use("/salidas", salidasRoutes);