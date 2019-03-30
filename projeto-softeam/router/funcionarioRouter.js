const router = require('express').Router();

const funcionarioController = require('../controller/funcionarioController');

const funcionarioRouter = () => {
    router.route('/')
      .get(funcionarioController.findAll)
      .post(funcionarioController.create);
  
    router.route('/:cpf')
      .get(funcionarioController.findOne)
      .put(funcionarioController.update)
      .delete(funcionarioController.remove);
  
    return router;
  };
  
  module.exports = funcionarioRouter;