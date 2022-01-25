import { CategoryModel } from '../../models/index.js';

class CategoryService {
  async createCategory(category) {
    const createCategory = await CategoryModel.create({ ...category });

    await createCategory.save();
    return createCategory;
  }

  async getCategoryAll() {
    const categories = await CategoryModel.find().sort({ "_id": -1 });

    return categories;
  }
};

export default new CategoryService();