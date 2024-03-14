import express from "express"

const unidadMeida = express.Router();

unidadMeida.get("/unimedida", (req,res) => {
    req.getConnection((error, conexion)=>{
        if (error) return res.status(500).json({error: "error de conexion con la base de datos"});
        conexion.query("SLECT * FROM unidades_meida", (er,resultado) => {
            if(err) return res.status(400).json({err: "error en la consulta"});
            res.status(200).json({mensaje: "consulta exitosa"})
        });
    });
});


export default unidadMeida;