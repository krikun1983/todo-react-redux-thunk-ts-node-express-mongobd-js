import { CategoryModel } from '../../models/index.js';

class CategoryService {
  async createCategory(category) {
    const createCategory = await CategoryModel.create({ ...category });

    await createCategory.save();
    return createCategory;
  }

  async createChildCategory(category) {
    const createCategory = await CategoryModel.create({ ...category });
    await createCategory.save();
    const categoryParent = await CategoryModel.findById(category.parentId);
    const parentUpdate = { _id: categoryParent._id, category: categoryParent.category, parentId: categoryParent.parentId, children: [createCategory._id, ...categoryParent.children] };
    await CategoryModel.findByIdAndUpdate(category.parentId, parentUpdate, { new: true });
    return createCategory;
  }

  async updateCategory(category) {
    if (!category._id) {
      throw new Error('ID не был указан');
    }
    const updatedPost = await CategoryModel.findByIdAndUpdate(category._id, category, { new: true });
    return updatedPost;
  }

  async getCategoryAll() {
    const categories = await CategoryModel.find().sort({ "_id": -1 });

    return categories;
  }
};

export default new CategoryService();