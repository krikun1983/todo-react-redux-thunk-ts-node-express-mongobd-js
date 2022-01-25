import { taskService } from './services/index.js';

class CategoryController {
  async createCategory(req, res, next) {
    try {
      const task = await taskService.createTask(req.body);

      res.json(task);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getCategoryAll(req, res, next) {
    try {
      const tasks = await taskService.getTaskAll();

      return res.json(tasks);
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();