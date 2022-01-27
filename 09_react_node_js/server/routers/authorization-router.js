import Router from 'express';
import { body } from 'express-validator';
import { authorizationController } from './controllers/index.js';
import { roleMiddleware, loggerMiddleware } from '../middlewares/index.js';

const authorizationRouter = new Router();

authorizationRouter.post('/registration', [
  body('username').trim().notEmpty(),
  body('password').trim().isLength({ min: 3, max: 32 }),
], loggerMiddleware.log, authorizationController.registration);

authorizationRouter.post('/login', [
  body('username', 'LOGIN field cannot be empty').trim().notEmpty(),
  body('password', 'PASSWORD field cannot be empty').trim().notEmpty(),
], loggerMiddleware.log, authorizationController.login);

authorizationRouter.post('/logout', roleMiddleware(['ADMIN']), authorizationController.logout);

authorizationRouter.get('/users', roleMiddleware(['ADMIN']), loggerMiddleware.log, authorizationController.getUsers);

export default authorizationRouter;