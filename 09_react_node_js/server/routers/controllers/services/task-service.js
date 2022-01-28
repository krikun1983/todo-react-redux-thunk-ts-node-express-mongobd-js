import { ApiError } from '../../../middlewares/exceptions/index.js';
import { CategoryModel, TaskModel } from '../../models/index.js';
import { findIdsForDel } from './utils/index.js';

class TaskService {
  async createTask(task) {
    const parentCategory = await CategoryModel.findById(task.categoryId);
    if (!parentCategory) {
      throw ApiError.BadRequest(`Parent category does not exist!`);
    }

    const createTask = await TaskModel.create({ ...task });
    await createTask.save();

    return createTask;
  }

  async makeTaskChecked(task) {
    if (!task.id) {
      throw ApiError.BadRequest(`ID not specified!`);
    }

    const parentCategory = await CategoryModel.findById(task.categoryId);
    if (!parentCategory) {
      throw ApiError.BadRequest(`Parent category does not exist!`);
    }

    const currentTask = await TaskModel.findById(task.id);
    currentTask.isDone = !currentTask.isDone;
    const updatedTask = await TaskModel.findByIdAndUpdate(task.id, currentTask, { new: true });

    return updatedTask;
  }

  async updateTask(task) {
    if (!task.id) {
      throw ApiError.BadRequest(`ID not specified!`);
    }

    const parentCategory = await CategoryModel.findById(task.categoryId);
    if (!parentCategory) {
      throw ApiError.BadRequest(`Parent category does not exist!`);
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(task.id, task, { new: true });

    return updatedTask;
  }

  async deleteTasks(category) {
    if (!category.id) {
      throw ApiError.BadRequest(`ID not specified!`);
    }

    const currentCategory = await CategoryModel.findById(category.id);

    if (!currentCategory) {
      throw ApiError.BadRequest(`Category not specified!`);
    }

    if (category.children.length) {
      const categories = await CategoryModel.find();
      const arrIdsCategoryDel = findIdsForDel([], categories, category.id);

      async function asyncForOf(array) {
        for (const id of array) {
          await TaskModel.deleteMany({ categoryId: id });
        }
      }

      asyncForOf(arrIdsCategoryDel);
    } else {
      await TaskModel.deleteMany({ categoryId: category.id });
    }

    const tasks = await TaskModel.find().sort({ "_id": -1 });
    return tasks;
  }

  async getAllTasks() {
    const tasks = await TaskModel.find().sort({ "_id": -1 });

    return tasks;
  }
};

export default new TaskService();