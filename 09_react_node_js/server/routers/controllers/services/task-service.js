import { ApiError } from '../../../middlewares/exceptions/index.js';
import { TaskModel } from '../../models/index.js';

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
    if (!task._id) {
      throw ApiError.BadRequest(`ID not specified`);
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(task._id, task, { new: true });

    return updatedTask;
  }

  async getAllTasks() {
    const tasks = await TaskModel.find().sort({ "_id": -1 });

    return tasks;
  }
};

export default new TaskService();