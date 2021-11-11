import { API_ROOT_URL } from '../constants/Api';
import ModalDeleteController from './modals/modalDeleteProducts/ModalDeleteController';
import ModalWindowController from './modals/modalWindow/ModalWindowController';
import DataProductsForTable from './models/DataProductsForTable';
import DataProductsForTableView from './viewModels/DataProductsForTableView';

class MainControllerOfTable {
  constructor() {
    this.dataProductsTable = new DataProductsForTable();
    this.viewProductsTable = new DataProductsForTableView({
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
    const modal = new ModalWindowController('', this.addProduct.bind(this));
    modal.show();
  }

  async editProduct(productCurrent) {
    await this.dataProductsTable.editProduct(productCurrent);
    this.viewProductsTable.render(this.dataProductsTable.products);
  }

  async openEditModal(id) {
    const productCurrent = this.dataProductsTable.products.find((item) => (item.id === id));
    const modal = new ModalWindowController(productCurrent, this.editProduct.bind(this));
    modal.show();
  }

  async deleteProduct(id) {
    await this.dataProductsTable.deleteProduct(id);
    this.viewProductsTable.render(this.dataProductsTable.products);
  }

  async openDeleteModal(id) {
    const productCurrent = this.dataProductsTable.products.find((item) => (item.id === id));
    const modal = new ModalDeleteController(productCurrent, this.deleteProduct.bind(this));
    modal.show();
  }

  sortFieldProductsTable(field, sorts) {
    this.dataProductsTable.sortTable(field, sorts);
    this.viewProductsTable.render(this.dataProductsTable.products);
  }
}

export default new MainControllerOfTable();
