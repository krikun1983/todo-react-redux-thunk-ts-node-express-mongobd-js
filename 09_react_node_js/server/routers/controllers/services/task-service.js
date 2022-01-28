import { ApiError } from '../../../middlewares/exceptions/index.js';
import { CategoryModel, TaskModel } from '../../models/index.js';
import { findIdsForDel } from './utils/index.js';

class TaskService {
  async createTask(task) {
    const createTask = await TaskModel.create({ ...task });
    await createTask.save();

    return createTask;
  }

  async makeTaskChecked(id) {
    if (!id) {
      throw ApiError.BadRequest(`ID not specified`);
    }

    const task = await TaskModel.findById(id);
    task.isDone = !task.isDone;
    const updatedTask = await TaskModel.findByIdAndUpdate(id, task, { new: true });

    return updatedTask;
  }

  async updateTask(task) {
    if (!task.id) {
      throw ApiError.BadRequest(`ID not specified`);
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(task.id, task, { new: true });

    return updatedTask;
  }

  async deleteTasks(category) {
    if (!category.id) {
      throw ApiError.BadRequest(`ID not specified`);
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