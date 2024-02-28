import dotenv from "dotenv";

dotenv.config();

const configDb = {
    mysql: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORTDB || 3306,
        user: process.env.USER || 'root',
        password: process.env.PASSWORD || '',
        database: process.env.DB || 'tu_bodega',
    }
};

export default configDb;