import { loggerMiddleware } from '../../middlewares/index.js';
import { categoryService } from './services/index.js';

class CategoryController {
  async createCategory(req, res, next) {
    try {
      const category = await categoryService.createCategory(req.body);

      res.json(category);
    } catch (error) {
      loggerMiddleware.errorLog(error, error.message);
      next(error);
    }
  }

  async createChildCategory(req, res, next) {
    try {
      const category = await categoryService.createChildCategory(req.body);

      res.json(category);
    } catch (error) {
      loggerMiddleware.errorLog(error, error.message);
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const category = await categoryService.updateCategory(req.body);

      res.json(category);
    } catch (error) {
      loggerMiddleware.errorLog(error, error.message);
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const category = await categoryService.deleteCategory(req.body);

      return res.json(category);
    } catch (error) {
      loggerMiddleware.errorLog(error, error.message);
      next(error);
    }
  }

  async getCategoryAll(req, res, next) {
    try {
      const categories = await categoryService.getCategoryAll();

      return res.json(categories);
    } catch (error) {
      loggerMiddleware.errorLog(error, error.message);
      next(error);
    }
  }
}

export default new CategoryController();