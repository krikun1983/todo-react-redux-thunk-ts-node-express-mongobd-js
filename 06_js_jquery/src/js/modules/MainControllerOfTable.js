import { API_ROOT_URL } from '../constants/Api';
import ModalWindowController from './modalWindow/ModalWindowController';
import DataProductsForTable from './models/DataProductsForTable';
import DataProductsForTableView from './viewModels/DataProductsForTableView';

class MainControllerOfTable {
  constructor() {
    this.dataProductsTable = new DataProductsForTable();
    this.viewProductsTable = new DataProductsForTableView({
      handlers: {
        openEditModal: this.openEditModal.bind(this),
        searchProduct: this.searchProduct.bind(this),
        deleteProduct: this.deleteProduct.bind(this),
      },
    });
  }

  async init() {
    await this.dataProductsTable.getProducts(API_ROOT_URL);
    this.viewProductsTable.render(this.dataProductsTable.products);
  }

  async searchProduct(search) {
    await this.dataProductsTable.searchProduct(search);
    this.viewProductsTable.render(this.dataProductsTable.products);
  }

  openEditModal(id) {
    const productCurrent = this.dataProductsTable.products.find((item) => (item.id === id));
    const modal = new ModalWindowController(productCurrent);
    modal.show();
  }

  async deleteProduct(id) {
    await this.dataProductsTable.deleteProduct(id);
    this.viewProductsTable.render(this.dataProductsTable.products);
  }

  // addProduct() {
  //   this.dataProductsTable.addProduct();
  // }
}

export default new MainControllerOfTable();
