const Filme = require('../models/filmeModel');

exports.cadastrarFilme = (req, res) => {
    const { titulo, link } = req.body;

    if (!req.file) {
        return res.status(400).json({ mensagem: 'A imagem do filme não foi enviada.' });
    }

    const imagem = req.file.filename;

    Filme.criar(titulo, link, imagem, (erro, resultado) => {
        if (erro) {
            console.error("ERRO REAL DO BANCO:", erro); 

            return res.status(500).json({ 
                mensagem: erro.sqlMessage || 'Erro ao salvar no banco'
            });
        }

        return res.status(201).json({
            mensagem: 'Filme cadastrado com sucesso!',
            id: resultado.insertId
        });
    });
};
``