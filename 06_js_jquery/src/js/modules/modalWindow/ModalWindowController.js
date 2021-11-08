import ProductDataModel from '../models/ProductDataModel.js';
import ProductDataView from './view/ProductDataView.js';

class ModalWindowController {
  constructor(initState) {
    this.productDataModel = new ProductDataModel(initState);
    this.productDataView = new ProductDataView();
  }

  show() {
    this.productDataView.showModal(this.productDataModel);
  }
}

export default ModalWindowController;
