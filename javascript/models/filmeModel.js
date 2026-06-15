const db = require("../conexao/conexao")

const filmes = {

    comprar: (id, callback) => {

        const sql = "SELECT valor FROM filmes WHERE id_filme = ?";

        db.query(sql, [id], (err, resultado) => {
            if (err) return callback(err);
        

        db.query(
            "UPDATE filmes SET comprados = comprados + 1 WHERE id_filme = ?",
            [id]
        )

        callback(null, resultado);
        })
    }
}

module.exports = filmes