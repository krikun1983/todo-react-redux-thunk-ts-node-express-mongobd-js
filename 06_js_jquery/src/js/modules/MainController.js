import { API_ROOT_URL } from '../constants/Api';
import ModalProductDelController from './modals/modalProductDel/ModalProductDelController';
import ModalProductAddEditController from './modals/modalProductAddEdit/ModalProductAddEditController';
import ProductDataForTable from './models/ProductDataForTable';
import ProductTableView from './viewModels/ProductTableView';

class MainController {
  constructor() {
    this.dataProductsTable = new ProductDataForTable();
    this.viewProductsTable = new ProductTableView({
      handlers: {
        openAddModal: this.openAddModal.bind(this),
        openEditModal: this.openEditModal.bind(this),
        searchProduct: this.searchProduct.bind(this),
        openDeleteModal: this.openDeleteModal.bind(this),
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

  async openAddModal() {
    const modal = new ModalProductAddEditController('', this.addProduct.bind(this));
    modal.show();
  }

  async editProduct(productCurrent) {
    await this.dataProductsTable.editProduct(productCurrent);
    this.viewProductsTable.render(this.dataProductsTable.products);
  }

  async openEditModal(id) {
    const productCurrent = this.dataProductsTable.products.find((item) => (item.id === id));
    const modal = new ModalProductAddEditController(productCurrent, this.editProduct.bind(this));
    modal.show();
  }

  async deleteProduct(id) {
    await this.dataProductsTable.deleteProduct(id);
    this.viewProductsTable.render(this.dataProductsTable.products);
  }

  async openDeleteModal(id) {
    const productCurrent = this.dataProductsTable.products.find((item) => (item.id === id));
    const modal = new ModalProductDelController(productCurrent, this.deleteProduct.bind(this));
    modal.show();
  }

  sortFieldProductsTable(field, sorts) {
    this.dataProductsTable.sortTable(field, sorts);
    this.viewProductsTable.render(this.dataProductsTable.products);
  }
}

export default new MainController();
