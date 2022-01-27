import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  categoryId: String,
  isDone: Boolean,
}).set('toJSON', {
  virtuals: true
});

export default mongoose.model('TaskModel', TaskSchema);