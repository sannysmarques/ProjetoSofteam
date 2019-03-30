const mongoose = require('mongoose');

const funcionarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    cpf: {
        type: Number,
        required: true,
        unique: true,
        trim: true  
    },
    telefone: {
        type: Number,
    },
    cep: {
        type: Number,
    },
    numero: {
        type: Number,
    },
    complemento: {
        type: String
    }
});

module.exports = mongoose.model('Funcionario', funcionarioSchema); 