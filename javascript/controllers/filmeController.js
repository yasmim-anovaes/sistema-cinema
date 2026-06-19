const filme = require("../models/filmeModel");



exports.listar = (req, res) => {
    filme.listar((err, resultados) => {
        if (err) return res.status(500).json(err);
        res.json(resultados);
    });
};


exports.comprar = (req, res) => {
    const idFilme = req.params.id;

    filme.comprar(idFilme, (err, resultado) => {
        if (err) {
          
            return res.status(400).json({ mensagem: err.message });
        }
        res.status(200).json(resultado);
    });
};