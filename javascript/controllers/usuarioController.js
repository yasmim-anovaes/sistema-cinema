
const usuario = require("../models/usuarioModel.js");

exports.cadastrar = (req, res) => {
    const dados = req.body;

    usuario.criar(dados, (err) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({ mensagem: "Usuario cadastro com sucesso" });
    });
};


exports.login = (req,res) => {
    
    console.log("=== LOGIN CHAMADO ===");


    const { email, senha } = req.body;

    console.log("Email:", email);
    console.log("Senha:", senha);
    

    

    usuario.login(email, senha, (err, resultado) => {

        console.log("ESTA ENTRANDO NO LOGIN?");

        if(err){
            console.log("ERRO:", err);
            return res.status(500).json(err);
        }

        console.log("RESULTADO:", resultado);

        if(resultado.length > 0){
            console.log("É MAIOR QUE 0?");
            res.json({
                login: true,
                usuario: resultado[0]
            });
        }else{
            console.log("RETORNOU FALSE?");
            res.json({
                login: false
            });
        }
    });
}