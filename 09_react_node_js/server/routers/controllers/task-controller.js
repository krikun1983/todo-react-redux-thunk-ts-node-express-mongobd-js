import { loggerMiddleware } from '../../middlewares/index.js';
import { taskService } from './services/index.js';

class TaskController {
  async createTask(req, res, next) {
    try {
      const task = await taskService.createTask(req.body);

      res.json(task);
    } catch (error) {
      loggerMiddleware.errorLog(error, error.message);
      next(error);
    }
  }

  async makeTaskChecked(req, res, next) {
    try {
      const task = await taskService.makeTaskChecked(req.body);

      res.json(task);
    } catch (error) {
      loggerMiddleware.errorLog(error, error.message);
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const task = await taskService.updateTask(req.body);

      res.json(task);
    } catch (error) {
      loggerMiddleware.errorLog(error, error.message);
      next(error);
    }
  }

  async deleteTasks(req, res, next) {
    try {
      const tasks = await taskService.deleteTasks(req.body);

      res.json(tasks);
    } catch (error) {
      loggerMiddleware.errorLog(error, error.message);
      next(error);
    }
  }

  async getAllTasks(req, res, next) {
    try {
      const tasks = await taskService.getAllTasks();

      return res.json(tasks);
    } catch (error) {
      loggerMiddleware.errorLog(error, error.message);
      next(error);
    }
  }
}

export default new TaskController();