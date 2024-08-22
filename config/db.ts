import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export default mysql.createConnection(`${process.env.DB_URL}`);
