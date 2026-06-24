const db = require("../conexao/conexao");

const usuario = {

    criar: (dados, callback) => {
        const sql = "INSERT INTO usuario(nome, email, senha, idade, cpf) VALUES (?,?,?,?,?)";
        db.query(sql, [dados.nome, dados.email, dados.senha, dados.idade, dados.cpf], callback);
    },

    login: (email, senha, callback) => {
        console.log("ENTROU NO LOGIN REPOSITORIES?")
        const sql = "SELECT * FROM usuario WHERE email = ? AND senha = ?";

        db.query(sql, [email, senha], (err, result) => {
            console.log(" ERRO MYSQL COMPLETO:", err);
            console.log(" RESULT MYSQL:", result);

            callback(err, result);
        });
    }
};

module.exports = usuario;