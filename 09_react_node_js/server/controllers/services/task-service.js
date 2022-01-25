import { TaskModel } from '../../models/index.js';

class TaskService {
  async createTask(task) {
    const createTask = await TaskModel.create({ ...task });
    await createTask.save();

    return createTask;
  }

  async updateTask(task) {

  }

  async deleteTask(task) {

  }

  async getTaskAll() {
    const tasks = await TaskModel.find().sort({ "_id": -1 });
    return tasks;
  }
};

export default new TaskService();