import Router from 'express';
import { check } from 'express-validator';
import controller from '../authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = new Router();

router.post('/registration', [
  check('username', "Имя пользователя не может быть пустым").notEmpty(),
  check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({
    min: 4, max: 10
  })
], controller.registration);

router.post('/login', [
  check('login', "Поле не может быть пустым").notEmpty(),
  check('password', "Поле не может быть пустым").notEmpty(),
], controller.login);

router.get('/users', authMiddleware, controller.getUsers);

export default router;