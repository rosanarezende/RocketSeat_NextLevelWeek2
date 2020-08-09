import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();

// ------ Métodos ------
// GET: Buscar ou listar uma informação
// POST: Criar alguma nova informação
// PUT: Atualizar uma informação existente
// DELETE: Deletar uma informação existente


// ------ Parâmetros ------
// Corpo (Request Body): dados para criação ou atualização de um registro
// Route Params: identificar qual recursos quero deletar ou atualizar
// Query Params: usado principalmente em listagem - paginação, ordenação, filtros

const classesControllers = new ClassesController();
const connectionsControllers = new ConnectionsController();

routes.get('/classes', classesControllers.index)
routes.post('/classes', classesControllers.create)

routes.get('/connections', connectionsControllers.index)
routes.post('/connections', connectionsControllers.create)

export default routes;
