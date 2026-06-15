const filme = require("../models/filmeModel");

exports.listar = (req,res)=>{
    filme.listar((err,resultados)=>{
        if(err) return res.stautus(500).json(err);
        res.json(resultados);
    })
};
