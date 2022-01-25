import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  categoryId: String,
  isDone: Boolean,
});

export default mongoose.model('TaskModel', TaskSchema);