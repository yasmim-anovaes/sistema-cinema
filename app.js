const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/usuarios', require('./javascript/rotas/usuariosRotas'));

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
