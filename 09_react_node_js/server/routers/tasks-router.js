import Router from 'express';
import { taskController } from '../controllers/index.js';
import { roleMiddleware } from '../middlewares/index.js';

const tasksRouter = new Router();

tasksRouter.get('/', roleMiddleware(['ADMIN']), taskController.getCategoryAll);
tasksRouter.post('/create', roleMiddleware(['ADMIN']), taskController.createCategory);

export default tasksRouter;