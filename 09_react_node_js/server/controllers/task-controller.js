import { taskService } from './services/index.js';

class TaskController {
  async createTask(req, res, next) {
    try {
      const task = await taskService.createTask(req.body);

      res.json(task);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async isDoneTask(req, res, next) {
    try {
      const task = await taskService.isDoneTask(req.body);

      res.json(task);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const task = await taskService.updateTask(req.body);

      res.json(task);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getTaskAll(req, res, next) {
    try {
      const tasks = await taskService.getTaskAll();

      return res.json(tasks);
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();