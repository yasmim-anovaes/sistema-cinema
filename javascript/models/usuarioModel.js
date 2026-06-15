const db = require("../conexao/conexao");

const usuario = {

    criar:(dados, callback) => {
        const sql = " INSERT INTO usuario(nome, email, senha, idade, cpf) VALUES (?,?,?,?,?)";

        db.query(sql, [dados.nome, dados.email, dados.senha, dados.idade, dados.cpf], callback)
    },

    login: (email, senha, callback) => {
        const sql = "SELECT*FROM usuario WHERE email = ? and senha = ?";

        db.query(sql, [email,senha], callback)

    }

}

module.exports = usuario;