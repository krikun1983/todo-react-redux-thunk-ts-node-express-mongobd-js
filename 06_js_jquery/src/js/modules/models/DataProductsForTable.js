import {
  API_ROOT_URL, API_URL_ADD, API_URL_DELETE, API_URL_UPDATE,
} from '../../constants/Api';
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

  async editProduct(id, productCurrent) {
    // this.products[id] = productCurrent;

    const temp = {
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
    console.log(temp);
    // await fetch(`${API_URL_UPDATE}${productCurrent.id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8',
    //   },
    //   body: JSON.stringify(temp),
    // });
    // await this.getProducts(API_ROOT_URL);
  }
  // async editProduct(id, productCurrent) {
  //   console.log(id);
  //   console.log(productCurrent);
  //   // this.products[id] = productCurrent;

  //   const temp = {
  //     name: 'Nokia',
  //     email: 'nokia@mail.ru',
  //     count: 100,
  //     price: 500,
  //     delivery: {
  //       country: 'Russia',
  //       city: [
  //         'Saratov',
  //       ],
  //     },
  //   };

  //   await fetch(`${API_URL_ADD}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //     },
  //     body: JSON.stringify(temp),
  //   });
  //   await this.getProducts(API_ROOT_URL);
  // }

  async deleteProduct(id) {
    await fetch(`${API_URL_DELETE}${id}`, { method: 'DELETE' });
    await this.getProducts(API_ROOT_URL);
  }
}

export default DataProductsForTable;
