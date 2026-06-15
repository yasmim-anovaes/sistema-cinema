const aperitivos = require("../models/aperitivoModel");

exports.listarAperitivos = (req, res) => {
    aperitivos.listar((err, resultados) => {
        if (err) return res.status(500).json(err);
        res.json(resultados);
    });
};
