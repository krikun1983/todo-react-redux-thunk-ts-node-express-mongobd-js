import { ApiError } from '../../../middlewares/exceptions/index.js';
import { CategoryModel } from '../../models/index.js';
import { findIdsForDel } from './utils/index.js';

class CategoryService {
  async createCategory(category) {
    const createCategory = await CategoryModel.create({ ...category });
    await createCategory.save();

    return createCategory;
  }

  async createChildCategory(category) {
    const parentCategory = await CategoryModel.findById(category.parentId);

    if (!parentCategory) {
      throw ApiError.BadRequest(`Category not specified`);
    }
    const createCategory = await CategoryModel.create({ ...category });
    await createCategory.save();

    const categoryParent = await CategoryModel.findById(category.parentId);
    const parentUpdate = { _id: categoryParent._id, category: categoryParent.category, parentId: categoryParent.parentId, children: [createCategory._id, ...categoryParent.children] };
    await CategoryModel.findByIdAndUpdate(category.parentId, parentUpdate, { new: true });

    return createCategory;
  }

  async updateCategory(category) {
    if (!category.id) {
      throw ApiError.BadRequest(`ID not specified`);
    }
    const currentCategory = await CategoryModel.findById(category.id);

    if (!currentCategory) {
      throw ApiError.BadRequest(`Category not specified`);
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(category.id, category, { new: true });

    return updatedCategory;
  }

  async deleteCategory(category) {
    if (!category.id) {
      throw ApiError.BadRequest(`ID not specified`);
    }
    let deleteCategory;

    const currentCategory = await CategoryModel.findById(category.id);

    if (!currentCategory) {
      throw ApiError.BadRequest(`Category not specified`);
    }

    if (!currentCategory) {
      throw ApiError.BadRequest(`ID not specified`);
    }

    if (category.children.length) {
      const categories = await CategoryModel.find();
      const arrIdsDel = findIdsForDel([], categories, category.id);
      deleteCategory = await CategoryModel.findByIdAndDelete(arrIdsDel[0]);

      const arrIdsWithoutDeleteCategory = arrIdsDel.slice(1);

      async function asyncForOf(array) {
        for (const id of array) {
          await CategoryModel.deleteMany({ _id: id });
        }
      }

      asyncForOf(arrIdsWithoutDeleteCategory);
    } else {
      deleteCategory = await CategoryModel.findByIdAndDelete(category.id);
    }

    if (category.parentId) {
      const categoryParent = await CategoryModel.findById(category.parentId);
      const children = categoryParent.children.filter(child => child !== category.id);
      const parentUpdate = { id: categoryParent.id, category: categoryParent.category, parentId: categoryParent.parentId, children: [...children] };
      await CategoryModel.findByIdAndUpdate(category.parentId, parentUpdate, { new: true });
    }

    return deleteCategory;
  }

  async getAllCategories() {
    const categories = await CategoryModel.find().sort({ "_id": -1 });

    return categories;
  }
};

export default new CategoryService();