import { ApiError } from '../../../middlewares/exceptions/index.js';
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
      throw ApiError.BadRequest(`ID not specified`);
    }
    const updatedCategory = await CategoryModel.findByIdAndUpdate(category._id, category, { new: true });

    return updatedCategory;
  }

  async deleteCategory(category) {
    if (!category._id) {
      throw ApiError.BadRequest(`ID not specified`);
    }
    const deleteCategory = await CategoryModel.findByIdAndDelete(category._id);

    const categoryParent = await CategoryModel.findById(category.parentId);
    const children = categoryParent.children.filter(child => child !== category._id);
    const parentUpdate = { _id: categoryParent._id, category: categoryParent.category, parentId: categoryParent.parentId, children: [...children] };
    await CategoryModel.findByIdAndUpdate(category.parentId, parentUpdate, { new: true });

    return deleteCategory;
  }

  async getCategoryAll() {
    const categories = await CategoryModel.find().sort({ "_id": -1 });

    return categories;
  }
};

export default new CategoryService();