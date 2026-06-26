const usuario = require("../models/usuarioModel.js");
const jwt = require('jsonwebtoken');

exports.cadastrar = (req, res) => {
    const dados = req.body;

    if (!dados.nome || !dados.email || !dados.senha || !dados.idade || !dados.cpf) {
        return res.status(400).json({ 
            mensagem: "Todos os campos são obrigatórios!" 
        });
    }

    usuario.criar(dados, (err) => {
        if (err) {
            console.error("Erro ao cadastrar:", err);
            return res.status(500).json({ 
                mensagem: "Erro ao cadastrar usuário", 
                erro: err.sqlMessage || err 
            });
        }
        res.json({ mensagem: "Usuario cadastrado com sucesso" });
    });
};

exports.login = (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ 
            login: false, 
            mensagem: "Email e senha são obrigatórios!" 
        });
    }

    usuario.login(email, senha, (err, resultado) => {
        if (err) {
            console.error("Erro no login:", err);
            return res.status(500).json({ 
                login: false, 
                mensagem: "Erro interno no servidor" 
            });
        }

        if (resultado.length > 0) {
            const user = resultado[0];

            const token = jwt.sign(
                {
                    id: user.id,
                    nome: user.nome,
                    email: user.email
                },
                process.env.JWT_SECRET || 'senha_super_secreta_123',
                { expiresIn: '1h' }
            );

            res.json({
                login: true,
                usuario: {
                    id: user.id,
                    nome: user.nome,
                    email: user.email
                },
                token: token
            });
        } else {
            res.json({ 
                login: false, 
                mensagem: "Email ou senha incorretos" 
            });
        }
    });
};