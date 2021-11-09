import { API_ROOT_URL, API_URL_DELETE } from '../../constants/Api';
import ProductDataModel from './ProductDataModel';

class DataProductsForTable {
  constructor() {
    this.products = [];
  }

  static async GetApiResource(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) { return false; }
      return await response.json();
    } catch (error) {
      return false;
    }
  }

  async getProducts(url) {
    const body = await new DataProductsForTable.GetApiResource(url);
    if (body) {
      this.products = [];
      body.Data.forEach(async (product) => {
        this.products.push(new ProductDataModel(product));
      });
    }
  }

  async searchProduct(search) {
    if (search.trim()) {
      this.products = this.products.filter((product) => product.name.toLowerCase().indexOf(search.toLowerCase().trim()) !== -1);
    } else {
      await this.getProducts(API_ROOT_URL);
    }
  }

  async deleteProduct(id) {
    await fetch(`${API_URL_DELETE}${id}`, { method: 'DELETE' });
    await this.getProducts(API_ROOT_URL);
  }
}

export default DataProductsForTable;
