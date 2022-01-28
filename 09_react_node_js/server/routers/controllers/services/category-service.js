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
    const updatedCategory = await CategoryModel.findByIdAndUpdate(category.id, category, { new: true });

    return updatedCategory;
  }

  static deleteAll(arrOfIdsDel, categories, id) {
    const fn = (arr, cat, catId) => {
      if (cat[catId].children.length > 0) {
        arr.push(catId);
        cat[catId].children.forEach(childId => {
          fn(arrOfIdsDel, categories, childId);
        });
      } else {
        arrOfIdsDel.push(id);
      }
      return arrOfIdsDel;
    }

    fn(arrOfIdsDel, categories, id);
  }

  async deleteCategory(category) {
    if (!category.id) {
      throw ApiError.BadRequest(`ID not specified`);
    }
    let deleteCategory;

    if (category.children.length) {
      const categories = await CategoryModel.find();
      const arrIdsDel = findIdsForDel([], categories, category.id);
      deleteCategory = await CategoryModel.findByIdAndDelete(arrIdsDel[0]);
      const arrIdsWithoutDeleteCategory = arrIdsDel.slice(1);

      async function processArray(array) {
        for (const item of array) {
          await CategoryModel.deleteMany({ _id: item });
        }
      }

      processArray(arrIdsWithoutDeleteCategory);
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