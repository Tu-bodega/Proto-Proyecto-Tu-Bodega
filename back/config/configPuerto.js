import dotenv from "dotenv";

dotenv.config();

const configPuerto = {
    puerto: process.env.PUERTO || 3001,
};

export default configPuerto;