const db = require('../conexao/conexao'); 

const Filme = {
    // criar: (titulo, link, imagem, callback) => {
    criar: (titulo, link, imagem,callback) => {
       
        const query = 'INSERT INTO filmes (titulo, link, imagem, criado_em) VALUES (?, ?, ?, NOW())';
        
       
       
        db.query(query, [titulo, link, imagem], callback);
    },

    listarTodos: (callback) => {
        const query = 'SELECT * FROM filmes ORDER BY id DESC';
        db.query(query, callback);
    }
};

module.exports = Filme;