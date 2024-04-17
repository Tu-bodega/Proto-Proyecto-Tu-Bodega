import validarUsuario from "../model/login_model.js"

function validar(req, res) {
    const rol = parseInt(req.body.rol);
    const correo = String(req.body.correo);
    const contra = String(req.body.contra);

    req.getConnection((error, validacion) => {
        if (error) {
            return res.status(500).json({ error: 'Fallo la conexión con la base de datos' });
        }
        validarUsuario(rol, correo, contra, validacion, (err, usuario) => {
            if (err) {
                return res.status(401).json({err:'fallo en la consulta'});
            }
            res.status(200).json(usuario);
        });

    });
};

export default validar;