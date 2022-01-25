import Router from 'express';
import { taskController } from '../controllers/index.js';
import { roleMiddleware } from '../middlewares/index.js';

const tasksRouter = new Router();

tasksRouter.get('/', roleMiddleware(['ADMIN']), taskController.getTaskAll);
tasksRouter.post('/create', roleMiddleware(['ADMIN']), taskController.createTask);
tasksRouter.post('/update', roleMiddleware(['ADMIN']), taskController.updateTask);
tasksRouter.post('/delete', roleMiddleware(['ADMIN']), taskController.deleteTask);

export default tasksRouter;