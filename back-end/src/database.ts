import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    connectionLimit: 10,
    queueLimit: 0,
    waitForConnections: true,
});

connection.connect((error) => {
    if (error) {
        console.log('Erro ao conectar', error)
    } else {
        console.log('Banco de dados conectado!')
    }
})

export default connection;