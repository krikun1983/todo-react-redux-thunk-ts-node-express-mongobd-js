import { validationResult } from 'express-validator';
import { authorizationService } from './services/index.js';
import { ApiError } from '../exceptions/index.js';
import { loggerMiddleware } from '../middlewares/index.js';

class AuthorizationController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        if (errors.errors[0]) {
          loggerMiddleware.errorLog(errors.errors, errors.errors[0].msg);
        }
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }

      const { username, password } = req.body;
      const userData = await authorizationService.registration(username, password);

      return res.json(userData);
    } catch (error) {
      loggerMiddleware.errorLog(error, error.message);
      next(error);
    }
  }

  async login(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      if (errors.errors[0]) {
        loggerMiddleware.errorLog(errors.errors, errors.errors[0].msg);
      }
      return next(ApiError.BadRequest('Validation error', errors.array()));
    }

    try {
      const { username, password } = req.body;
      const userData = await authorizationService.login(username, password);

      return res.json(userData);
    } catch (error) {
      loggerMiddleware.errorLog(error, error.message);
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      const token = await authorizationService.logout(accessToken);

      return res.json(token);
    } catch (error) {
      loggerMiddleware.errorLog(error, error.message);
      next(error);
    }
  }

  async getUsers(req, res) {
    const users = await authorizationService.getUsers();
    return res.json(users);
  }

}

export default new AuthorizationController();