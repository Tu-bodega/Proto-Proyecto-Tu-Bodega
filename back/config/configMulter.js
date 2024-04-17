import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `uploads/`); //config destino de archivos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);//configura el nomnbre de cada archivo con una fecha unica
    }
});

const upload = multer({ storage: storage });


export default upload;