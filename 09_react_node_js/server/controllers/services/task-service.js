import { TaskModel } from '../../models/index.js';

class TaskService {
  async createTask(task) {
    const createTask = await TaskModel.create({ ...task });
    await createTask.save();

    return createTask;
  }

  async getTaskAll() {
    const tasks = await TaskModel.find();
    return tasks;
  }
};

export default new TaskService();