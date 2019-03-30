const Funcionario = require('../models/funcionarioModel');

const create = async (req, res) => {
    try {
      const { nome, cpf, telefone, cep, numero, complemento } = req.body;

      const procurarFuncionario = await Funcionario.findOne({ cpf: cpf });

      if(procurarFuncionario){
        return res.status(400).send('Esse CPF já foi cadastrado!');
      }

      const funcionario = new Funcionario({
        nome,
        cpf,
        telefone,
        cep,
        numero,
        complemento
      });

      await funcionario.save();
      return res.status(201).json({ message: 'Funcionário registrado!', funcionario });
    } catch (error) {
      return res.status(500).json({ message: 'Erro no sistema!', error })
    }
  };

      
const findAll = async (req, res) => {
    try {
      const funcionarios = await Funcionario.find({}); 
      return res.status(200).json({ message: 'Funcionários cadastrados:', funcionarios });
    } catch (error) {
      return res.status(500).json({ message: 'Erro no sistema!', error })
    }
  };


  
const findOne = async (req, res) => {
    try {
      const { cpf } = req.params;
      const funcionario = await Funcionario.findOne({ cpf: cpf }); 

      if (!funcionario){
        return res.status(404).json({ message: 'Funcionário não cadastrado!' });
      } 
      return res.status(200).json({ message: 'Funcionário encontrado:', funcionario });
    } catch (error) {
      return res.status(500).json({ message: 'Erro no sistema!', error })
    }
  };
  
  
  
const update = async (req, res) => {
    try {
      const { nome, telefone, cep, numero, complemento } = req.body;
      const { cpf } = req.params;
      const updatedFuncionario = await Funcionario.findOneAndUpdate(
        {
          cpf: cpf
        },
        {
          nome,
          telefone,
          cep,
          numero,
          complemento
        }
      );

      if (!updatedFuncionario) {
        return res.status(404).json({ message: 'Funcionário não cadastrado!' });
      }
      const funcionario = await Funcionario.findOne({ cpf: cpf });  
      return res.status(200).send('Dados atualizados!');
    } catch (error) {
      return res.status(500).json({ message: 'Erro no sistema!', error })
    }
  };
  

const remove = async (req, res) => {
    try {
      const { cpf } = req.params;
      const funcionario = await Funcionario.findOneAndRemove({ cpf: cpf });

      if (!funcionario) {
        return res.status(404).send('Funcionário não cadastrado!');
      } 
      return res.status(200).json('Funcionário deletado!');
    } catch (error) {
      return res.status(500).send('Erro no sistema!')
    }
  };


module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
  };
  