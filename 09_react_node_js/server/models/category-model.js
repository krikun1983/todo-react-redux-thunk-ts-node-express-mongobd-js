import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  parentId: String || null,
  children: [{ type: String }],
});

export default mongoose.model('CategoryModel', CategorySchema);