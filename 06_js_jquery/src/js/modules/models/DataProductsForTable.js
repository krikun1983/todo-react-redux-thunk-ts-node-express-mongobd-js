import ProductDataModel from './ProductDataModel';

class DataProductsForTable {
  constructor() {
    this.products = [];
  }

  async getProducts() {
    const response = await fetch('https://api-crud-mongo.herokuapp.com/api/v1/products');
    const body = await response.json();
    console.log(body.Data);

    body.Data.forEach(async (product) => {
      this.products.push(new ProductDataModel(product));
    });
  }
}

export default DataProductsForTable;
