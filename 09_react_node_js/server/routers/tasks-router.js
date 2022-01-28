import Router from 'express';
import { taskController } from './controllers/index.js';
import { roleMiddleware, loggerMiddleware } from '../middlewares/index.js';

const tasksRouter = new Router();

tasksRouter.get('/', roleMiddleware(['ADMIN']), loggerMiddleware.log, taskController.getAllTasks);
tasksRouter.post('/create', roleMiddleware(['ADMIN']), loggerMiddleware.log, taskController.createTask);
tasksRouter.post('/makeTask', roleMiddleware(['ADMIN']), loggerMiddleware.log, taskController.makeTaskChecked);
tasksRouter.post('/update', roleMiddleware(['ADMIN']), loggerMiddleware.log, taskController.updateTask);
tasksRouter.post('/delete', roleMiddleware(['ADMIN']), loggerMiddleware.log, taskController.deleteTasks);

export default tasksRouter;