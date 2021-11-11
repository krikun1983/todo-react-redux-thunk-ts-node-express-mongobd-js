import {
  API_ROOT_URL, API_URL_ADD, API_URL_DELETE, API_URL_UPDATE,
} from '../../constants/Api';
import ProductDataModel from './ProductDataModel';

class ProductDataForTable {
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
    const body = await new ProductDataForTable.GetApiResource(url);
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

  sortTable(field, sorts) {
    if (sorts) {
      this.products.sort((a, b) => {
        if (a[field] < b[field]) {
          return -1;
        }
        if (a[field] > b[field]) {
          return 1;
        }
        return 0;
      });
    } else {
      this.products.sort((a, b) => {
        if (a[field] < b[field]) {
          return 1;
        }
        if (a[field] > b[field]) {
          return -1;
        }
        return 0;
      });
    }
  }

  async editProduct(productCurrent) {
    const dataProduct = {
      id: productCurrent.id,
      name: productCurrent.name,
      email: productCurrent.email,
      count: +productCurrent.count,
      price: +productCurrent.price,
      delivery: {
        country: productCurrent.delivery.country,
        city: productCurrent.delivery.city,
      },
    };

    await fetch(`${API_URL_UPDATE}${productCurrent.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(dataProduct),
    });
    await this.getProducts(API_ROOT_URL);
  }

  async addProduct(productCurrent) {
    const productNew = {
      name: productCurrent.name,
      email: productCurrent.email,
      count: +productCurrent.count,
      price: +productCurrent.price,
      delivery: {
        country: productCurrent.delivery.country,
        city: productCurrent.delivery.city,
      },
    };

    await fetch(`${API_URL_ADD}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(productNew),
    });
    await this.getProducts(API_ROOT_URL);
    this.products.forEach(async (product) => {
      if (product.name === productNew.name) {
        await this.editProduct({ id: product.id, ...productNew });
      }
    });
  }

  async deleteProduct(id) {
    await fetch(`${API_URL_DELETE}${id}`, { method: 'DELETE' });
    await this.getProducts(API_ROOT_URL);
  }
}

export default ProductDataForTable;
