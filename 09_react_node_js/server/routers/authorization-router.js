import Router from 'express';
import { check } from 'express-validator';
import { body } from 'express-validator';
import { authorizationController } from '../controllers/index.js';
import { roleMiddleware } from '../middlewares/index.js';

const authorizationRouter = new Router();

authorizationRouter.post('/registration',
  body('username').notEmpty(),
  body('password').isLength({ min: 3, max: 32 }), authorizationController.registration);

authorizationRouter.post('/login', [
  check('login', "Поле не может быть пустым").notEmpty(),
  check('password', "Поле не может быть пустым").notEmpty(),
], authorizationController.login);

authorizationRouter.post('/logout', roleMiddleware(['ADMIN']), authorizationController.logout);

authorizationRouter.get('/users', roleMiddleware(['ADMIN']), authorizationController.getUsers);

export default authorizationRouter;