const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ mensagem: "Token não fornecido" });
    }

    const token = authHeader.split(' ')[1]; 

    jwt.verify(token, process.env.JWT_SECRET || 'senha_super_secreta_123', (err, decoded) => {
        if (err) {
            return res.status(403).json({ mensagem: "Token inválido" });
        }

        req.usuario = decoded; 
        next();
    });
};

module.exports = verificarToken;