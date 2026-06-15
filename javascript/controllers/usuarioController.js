const usuario = require('../models/usuarioModel');

exports.cadastrar = (req,res) =>{
    const dados =req.body;

    usuario.criar(dados, (err)=>{
        if (err) return res.status(500).json(err);
        res.json({mensagem : "Usuario cadastro com sucesso"});

    });
};

exports.login = (req,res) => {
    const {email,senha}= req.body;

    usuario.login(email,senha, (err,resultado)=>{
        if(err) return res.status(500).json(err);

        if(resultado.lenght > 0){
            res.json({login: true,usuario:resultado[0]});
        }else{
            res.json({login:false})
        }
    })
}