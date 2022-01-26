import Router from 'express';
import { categoryController } from '../controllers/index.js';
import { roleMiddleware, loggerMiddleware } from '../middlewares/index.js';

const categoriesRouter = new Router();

categoriesRouter.get('/', roleMiddleware(['ADMIN']), loggerMiddleware.log, categoryController.getCategoryAll);
categoriesRouter.post('/create', roleMiddleware(['ADMIN']), loggerMiddleware.log, categoryController.createCategory);
categoriesRouter.post('/create/child', roleMiddleware(['ADMIN']), loggerMiddleware.log, categoryController.createChildCategory);
categoriesRouter.post('/update', roleMiddleware(['ADMIN']), loggerMiddleware.log, categoryController.updateCategory);
categoriesRouter.post('/delete', roleMiddleware(['ADMIN']), loggerMiddleware.log, categoryController.deleteCategory);

export default categoriesRouter;