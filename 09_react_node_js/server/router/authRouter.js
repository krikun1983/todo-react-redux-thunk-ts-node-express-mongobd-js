import Router from 'express';
import { check } from 'express-validator';
import { body } from 'express-validator';
import AuthController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = new Router();

router.post('/registration',
  body('username').notEmpty(),
  body('password').isLength({ min: 3, max: 32 }), AuthController.registration);

router.post('/login', [
  check('login', "Поле не может быть пустым").notEmpty(),
  check('password', "Поле не может быть пустым").notEmpty(),
], AuthController.login);

router.post('/logout', AuthController.logout);
router.get('/users', authMiddleware, AuthController.getUsers);
router.get('/categories', authMiddleware, AuthController.getCategoryAll);
router.get('/tasks', authMiddleware, AuthController.getTasksAll);

export default router;