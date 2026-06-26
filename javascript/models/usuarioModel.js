const db = require("../conexao/conexao");
const bcrypt = require('bcrypt');

const usuario = {

    criar: (dados, callback) => {
        // Criptografa a senha antes de salvar no banco
        bcrypt.hash(dados.senha, 10, (err, hash) => {
            if (err) {
                console.error("Erro ao criptografar senha:", err);
                return callback(err);
            }

            // Substitui a senha pelo hash
            const dadosCriptografados = {
                ...dados,
                senha: hash
            };

            const sql = "INSERT INTO usuario(nome, email, senha, idade, cpf) VALUES (?,?,?,?,?)";
            
            db.query(sql, [
                dadosCriptografados.nome, 
                dadosCriptografados.email, 
                dadosCriptografados.senha, 
                dadosCriptografados.idade, 
                dadosCriptografados.cpf
            ], callback);
        });
    },

    login: (email, senha, callback) => {
        const sql = "SELECT * FROM usuario WHERE email = ?";

        db.query(sql, [email], (err, result) => {
            if (err) {
                console.log("ERRO MYSQL:", err);
                return callback(err, null);
            }

            // Se não encontrou usuário
            if (result.length === 0) {
                return callback(null, []);
            }

            const usuarioEncontrado = result[0];

            // Compara a senha digitada com o hash salvo no banco
            bcrypt.compare(senha, usuarioEncontrado.senha, (err, senhaCorreta) => {
                if (err) {
                    console.error("Erro ao comparar senha:", err);
                    return callback(err, null);
                }

                if (senhaCorreta) {
                    // Senha correta - retorna o usuário (sem a senha)
                    delete usuarioEncontrado.senha; // Remove a senha do objeto por segurança
                    callback(null, [usuarioEncontrado]);
                } else {
                    // Senha incorreta
                    callback(null, []);
                }
            });
        });
    }
};

module.exports = usuario;