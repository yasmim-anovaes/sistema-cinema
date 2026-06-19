const db = require("../conexao/conexao");

const filme = {
    listar: (callback) => {
        const sql = "SELECT * FROM filmes";
        db.query(sql, callback);
    },

    comprar: (id, callback) => {
      
        const sqlConsultar = "SELECT quantidade_dis, valor FROM filmes WHERE id_filme = ?";

        db.query(sqlConsultar, [id], (err, resultado) => {
            if (err) return callback(err);
            
            if (resultado.length === 0) {
                return callback(new Error("Filme não encontrado!"));
            }

            const dadosFilme = resultado[0];

            if (dadosFilme.quantidade_dis <= 0) {
                return callback(new Error("Ingressos esgotados para este filme!"));
            }

            
            const sqlAtualizar = `
                UPDATE filmes 
                SET comprados = comprados + 1, 
                    quantidade_dis = quantidade_dis - 1 
                WHERE id_filme = ?
            `;

            db.query(sqlAtualizar, [id], (errUpdate, resultadoUpdate) => {
                if (errUpdate) return callback(errUpdate);

                
                callback(null, { 
                    mensagem: "Compra realizada com sucesso!", 
                    valor: dadosFilme.valor 
                });
            });
        });
    }
};

module.exports = filme;