import Router from 'express';
import { taskController } from './controllers/index.js';
import { roleMiddleware, loggerMiddleware } from '../middlewares/index.js';

const tasksRouter = new Router();

tasksRouter.get('/', roleMiddleware(['ADMIN']), loggerMiddleware.log, taskController.getTaskAll);
tasksRouter.post('/create', roleMiddleware(['ADMIN']), loggerMiddleware.log, taskController.createTask);
tasksRouter.post('/makeTask', roleMiddleware(['ADMIN']), loggerMiddleware.log, taskController.makeTaskChecked);
tasksRouter.post('/update', roleMiddleware(['ADMIN']), loggerMiddleware.log, taskController.updateTask);

export default tasksRouter;