require('dotenv').config()

const mysql = require ('mysql2');

console.log(process.env);

const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD ,
    database:process.env.DB_NAME   
   
})

conexao.connect((err)=>{
    if(err){
        console.error('Erro ao conectar:',err);
        return;

    }
    console.log('Conectado ao banco');
    
})

module.exports = conexao; 