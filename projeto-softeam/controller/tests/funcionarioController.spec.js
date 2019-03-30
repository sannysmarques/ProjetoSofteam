const request = require('supertest');
const app = require('../../index');
const Funcionario = require('../../models/userModel');

beforeAll(() => Funcionario.remove({})); 

describe('Funcionario', () => {

  describe('Create', () => {
    test('Registrar um funcionário', async () => {
      const response = await request(app).post('/funcionario').send(
        {
          nome: 'test',
          telefone: '123456789',
          cpf: '12345678900',
          cep: '12345678',
          numero: '12',
          complemento: 'test example'
        }
      );
      expect(response.status).toBe(201);
    });

    test('Não registrar um funcionário com um CPF já cadastrado', async () => {
      const response = await request(app).post('/funcionario').send(
        {
          cpf: '12345678900' 
        }
      );
      expect(response.status).toBe(400);
    });

    test('Não registrar um funcionário sem nome e CPF', async () => {
      const response = await request(app).post('/funcionario').send(
        {
          nome: 'test',
          cpf: '12345678900'
        }
      );
      expect(response.status).toBe(500);
    });
  });

  describe('Find', () => {
    test('Funcionário foi encontrado', async () => {
      const Funcionario = await Funcionario.create(       
        {
          cpf: '12345678900'
        }
      );
      const response = await request(app).get('/funcionario/12345678900');
      expect(response.status).toBe(200);
    });

    test('Funcionário não foi encontrado', async () => {
      const Funcionario = await Funcionario.create(        
        {
          cpf: '12345678900'
        } 
      );
      const response = await request(app).get('/funcionario/12345678900');
      expect(response.status).toBe(500);
    });

    test('Funcionário não está cadastrado', async () => {
      const response = await request(app).get('/funcionario/1234');
      expect(response.status).toBe(404);
    });
  });

  describe('Update', () => {
    test('Funcionário foi atualizado', async () => {
      const Funcionario = await Funcionario.create(        
        {
          cpf: '12345678900'
        } 
      );
      const response = await request(app).put('/funcionario/12345678900');
      expect(response.status).toBe(200);
    });

    test('Funcionário não foi atualizado', async () => {
      const Funcionario = await Funcionario.create(        
        {
          cpf: '12345678900'
        } 
      );
      const response = await request(app).put('/funcionario/12345678900');
      expect(response.status).toBe(500);
    });

    test('Funcionário não está cadastrado', async () => {
      const response = await request(app).put('/funcionario/12345678900');
      expect(response.status).toBe(404);
    });
  })

  describe('Remove', () => {
    test('Funcionário foi deletado', async () => {
      const Funcionario = await Funcionario.create(        
        {
          cpf: '12345678900'
        } 
      );
      const response = await request(app).delete('/funcionario/12345678900');
      expect(response.status).toBe(200);
    });

    test('Funcionário não foi deletado', async () => {
      const Funcionario = await Funcionario.create(        
        {
          cpf: '12345678900'
        } 
      );
      const response = await request(app).delete('/funcionario/12345678900');
      expect(response.status).toBe(500);
    });

    test('Funcionário não está cadastrado', async () => {
      const response = await request(app).delete('/funcionario/12345678900');
      expect(response.status).toBe(404);
    });
  });

});
