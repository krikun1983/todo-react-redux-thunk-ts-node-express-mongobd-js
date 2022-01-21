import mongoose from 'mongoose';

const Category = new mongoose.Schema({
  category: { type: String, required: true },
  parentId: { type: String, required: true },
  children: { type: Array, required: true },
});

export default mongoose.model('Category', Category);