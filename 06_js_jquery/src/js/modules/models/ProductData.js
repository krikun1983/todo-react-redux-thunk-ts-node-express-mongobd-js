import $ from 'jquery';
import {
  API_ROOT_URL, API_URL_ADD, API_URL_DELETE, API_URL_UPDATE,
} from '../../constants/Api';
import ProductDataModel from './ProductDataModel';

class ProductData {
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
    $('#spinner').removeClass('hidden');
    const body = await new ProductData.GetApiResource(url);
    if (body) {
      this.products = [];
      body.Data.forEach(async (product) => {
        this.products.push(new ProductDataModel(product));
      });
    }
    $('#spinner').addClass('hidden');
  }

  async searchProduct(search) {
    if (search) {
      this.products = this.products.filter((product) => product.name.toLowerCase().indexOf(search) !== -1);
    } else {
      await this.getProducts(API_ROOT_URL);
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
    $('#spinner').removeClass('hidden');
    await fetch(`${API_URL_UPDATE}${productCurrent.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(dataProduct),
    });
    await this.getProducts(API_ROOT_URL);
    $('#spinner').addClass('hidden');
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
    $('#spinner').removeClass('hidden');
    const productAdded = await fetch(`${API_URL_ADD}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(productNew),
    });
    const productUpdate = await productAdded.json();
    productUpdate.Data.delivery = productNew.delivery;
    await this.editProduct(productUpdate.Data);
    $('#spinner').addClass('hidden');
  }

  async deleteProduct(id) {
    $('#spinner').removeClass('hidden');
    await fetch(`${API_URL_DELETE}${id}`, { method: 'DELETE' });
    await this.getProducts(API_ROOT_URL);
    $('#spinner').addClass('hidden');
  }
}

export default ProductData;
