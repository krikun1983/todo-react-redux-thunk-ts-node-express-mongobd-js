import Router from 'express';
import { taskController } from '../controllers/index.js';
import { roleMiddleware } from '../middlewares/index.js';

const tasksRouter = new Router();

tasksRouter.get('/', roleMiddleware(['ADMIN']), taskController.getTaskAll);
tasksRouter.post('/create', roleMiddleware(['ADMIN']), taskController.createTask);
tasksRouter.post('/isDone', roleMiddleware(['ADMIN']), taskController.isDoneTask);
tasksRouter.post('/update', roleMiddleware(['ADMIN']), taskController.updateTask);

export default tasksRouter;