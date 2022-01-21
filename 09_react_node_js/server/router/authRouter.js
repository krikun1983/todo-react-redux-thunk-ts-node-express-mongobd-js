import Router from 'express';
import { check } from 'express-validator';
import AuthController from '../authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = new Router();

router.post('/registration', [
  check('username', "Имя пользователя не может быть пустым").notEmpty(),
  check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({
    min: 4, max: 10
  })
], AuthController.registration);

router.post('/login', [
  check('login', "Поле не может быть пустым").notEmpty(),
  check('password', "Поле не может быть пустым").notEmpty(),
], AuthController.login);

router.get('/users', authMiddleware, AuthController.getUsers);

router.post('/categories', AuthController.createCategory);

router.get('/categories', authMiddleware, AuthController.getCategoryAll);
router.get('/categories/:id', AuthController.getCategoryOne);
router.get('/tasks', authMiddleware, AuthController.getTasksAll);

export default router;