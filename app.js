const express = require('express');
const cors = require('cors');
const path = require('path'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/usuarios', require('./javascript/rotas/usuariosRotas'));
app.use('/filmes', require('./javascript/rotas/filmeRotas'));

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});