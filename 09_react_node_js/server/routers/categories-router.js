import Router from 'express';
import { categoryController } from '../controllers/index.js';
import { roleMiddleware } from '../middlewares/index.js';

const categoriesRouter = new Router();

categoriesRouter.get('/', roleMiddleware(['ADMIN']), categoryController.getCategoryAll);
categoriesRouter.post('/create', roleMiddleware(['ADMIN']), categoryController.createCategory);
categoriesRouter.post('/create/child', roleMiddleware(['ADMIN']), categoryController.createChildCategory);

export default categoriesRouter;