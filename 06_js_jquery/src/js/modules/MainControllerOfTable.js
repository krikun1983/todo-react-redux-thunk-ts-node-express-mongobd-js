import DataProductsForTable from './models/DataProductsForTable';
import DataProductsForTableView from './viewModels/DataProductsForTableView';

class MainControllerOfTable {
  constructor() {
    this.dataProductsTable = new DataProductsForTable();
    this.viewProductsTable = new DataProductsForTableView();
  }

  async init() {
    await this.dataProductsTable.getProducts();
    this.viewProductsTable.render(this.dataProductsTable.products);
  }
}

export default new MainControllerOfTable();
