const db = require("../conexao/conexao");

const aperitivos={

    comprar:(id, callback) =>{
        const sql = 'SELECT valor FROM  aperitivos WHERE id =? ';

         b.query(sql, [id], (err, resultado) => {
            if (err) return callback(err);
        

        db.query(
            "UPDATE aperitivos SET comprados = comprados + 1 WHERE id = ?",
            [id]
        )

        callback(null, resultado);
        })
    }
}

module.exports = aperitivos