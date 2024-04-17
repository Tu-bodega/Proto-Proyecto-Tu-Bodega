import dotenv from "dotenv";

dotenv.config();

const configDataBase = {
    db : {
        host : process.env.HOST || 'localhost',
        port : process.env.PORTDB || 3306,
        user : process.env.USER || 'root',
        password : process.env.PASSWORD || '',
        database : process.env.DATABASE || 'tu_bodega', 
    }
};

export default configDataBase;