require('dotenv').config();
const mysql = require('mysql2');

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
   
    ssl: {
        rejectUnauthorized: false
    }
});

conexao.connect((err) => {
    if (err) {
        console.error(" ERRO AO CONECTAR NO MYSQL:");
        console.error(err.message);
       
        console.log(" Conectado ao banco com sucesso!");
    }
});

module.exports = conexao;