import { validationResult } from 'express-validator';
import userService from '../services/user-service.js';
import ApiError from '../exceptions/api-error.js';
import fs from 'fs';

class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      }
      const { username, password } = req.body;
      const userData = await userService.registration(username, password);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const userData = await userService.login(username, password);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const token = await userService.logout(accessToken);
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async getCategoryAll(req, res, next) {
    try {
      fs.readFile('./data_default/data_categories.json', 'utf8', (err, data) => {
        if (err) {
          console.log(`Error reading file from disk: ${err}`);
        } else {
          const categories = JSON.parse(data);
          return res.json(categories);
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getTasksAll(req, res, next) {
    try {
      fs.readFile('./data_default/data_tasks.json', 'utf8', (err, data) => {
        if (err) {
          console.log(`Error reading file from disk: ${err}`);
        } else {
          const tasks = JSON.parse(data);
          return res.json(tasks);
        }
      })
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res) {
  }

}

export default new AuthController();