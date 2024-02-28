import dotenv from "dotenv";

dotenv.config();

const configPuerto = {
    puerto: process.env.LISTENPORT || 3002,
};

export default configPuerto;