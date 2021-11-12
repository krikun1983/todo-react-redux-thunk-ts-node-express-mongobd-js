import { API_ROOT_URL } from '../constants/Api';
import ModalProductDelController from './modals/modalProductDel/ModalProductDelController';
import ModalAddEditProductController from './modals/modalProductAddEdit/ModalAddEditProductController';
import ProductData from './models/ProductData';
import ProductTableView from './viewModels/ProductTableView';
import sortFieldTable from '../utils/sortFieldTable';

class MainController {
  constructor() {
    this.dataProductsTable = new ProductData();
    this.viewProductsTable = new ProductTableView({
      handlers: {
        openModalAddProduct: this.openModalAddProduct.bind(this),
        openModalEditProduct: this.openModalEditProduct.bind(this),
        openModalDeleteProduct: this.openModalDeleteProduct.bind(this),
        searchProduct: this.searchProduct.bind(this),
        sortFieldProductsTable: this.sortFieldProductsTable.bind(this),
      },
    });
  }

  async init() {
    await this.dataProductsTable.getProducts(API_ROOT_URL);
    this.viewProductsTable.render(this.dataProductsTable.products);
    this.viewProductsTable.listeners();
  }

  async searchProduct(search) {
    await this.dataProductsTable.searchProduct(search);
    this.viewProductsTable.render(this.dataProductsTable.products);
  }

  async addProduct(productCurrent) {
    await this.dataProductsTable.addProduct(productCurrent);
    this.viewProductsTable.render(this.dataProductsTable.products);
  }

  async openModalAddProduct() {
    const modal = new ModalAddEditProductController('', this.addProduct.bind(this));
    modal.show();
  }

  async editProduct(productCurrent) {
    await this.dataProductsTable.editProduct(productCurrent);
    this.viewProductsTable.render(this.dataProductsTable.products);
  }

  async openModalEditProduct(id) {
    const productCurrent = this.dataProductsTable.products.find((item) => (item.id === id));
    const modal = new ModalAddEditProductController(productCurrent, this.editProduct.bind(this));
    modal.show();
  }

  async deleteProduct(id) {
    await this.dataProductsTable.deleteProduct(id);
    this.viewProductsTable.render(this.dataProductsTable.products);
  }

  async openModalDeleteProduct(id) {
    const productCurrent = this.dataProductsTable.products.find((item) => (item.id === id));
    const modal = new ModalProductDelController(productCurrent, this.deleteProduct.bind(this));
    modal.show();
  }

  sortFieldProductsTable(field, sorts) {
    sortFieldTable(field, sorts, this.dataProductsTable.products);
    this.viewProductsTable.render(this.dataProductsTable.products);
  }
}

export default new MainController();
