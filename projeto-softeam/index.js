const http = require("http");
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const funcionarioRouter = require('./router/funcionarioRouter')


app.get("/", (req, res) => {
    res.send("<h1>Servidor rodando</h1>");
});

app.listen(8000, () => console.log("Servidor rodando local na porta 8000"));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/projeto');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/funcionario', funcionarioRouter());

//const swaggerDocument = require('./docs/documentation.json');
//app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app.listen(8000, () => console.log('Tá rodando')); 

