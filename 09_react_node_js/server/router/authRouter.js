import Router from 'express';
import { check } from 'express-validator';
import AuthController from '../authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = new Router();

router.post('/login', [
  check('login', "Поле не может быть пустым").notEmpty(),
  check('password', "Поле не может быть пустым").notEmpty(),
], AuthController.login);

router.get('/categories', authMiddleware, AuthController.getCategoryAll);
router.get('/tasks', authMiddleware, AuthController.getTasksAll);

export default router;