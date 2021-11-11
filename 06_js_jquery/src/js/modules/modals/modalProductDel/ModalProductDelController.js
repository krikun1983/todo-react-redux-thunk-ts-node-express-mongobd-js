import ProductDataModel from '../../models/ProductDataModel';
import ProductDeleteView from './view/ProductDeleteView';

class ModalProductDelController {
  constructor(initState, onSubmit) {
    this.onSubmitAction = onSubmit;
    this.productDeleteModel = new ProductDataModel(initState);
    this.productDeleteView = new ProductDeleteView({
      handlers: {
        onSubmit: this.onSubmit.bind(this),
        onClose: this.onClose.bind(this),
      },
    });
  }

  show() {
    this.productDeleteView.showModal(this.productDeleteModel);
  }

  async onSubmit() {
    await this.onSubmitAction(this.productDeleteModel.id);
    this.productDeleteView.closeModal();
  }

  onClose() {
    this.productDeleteView.closeModal();
  }
}

export default ModalProductDelController;
