import $ from 'jquery';
import { templateProductDelModal } from '../../../../templates';

class ProductDeleteView {
  constructor(props) {
    this.$root = $('.modal-delete-root');
    this.handlers = props.handlers;
  }

  render(productCurrent) {
    this.$root.html(templateProductDelModal(productCurrent));
  }

  initialHandlers() {
    this.$root.on('click', '[data-action="delete-yes"]', this.handlers.onSubmit);
    this.$root.on('click', '[data-action="delete-no"]', this.handlers.onClose);
  }

  showModal(productCurrent) {
    this.render(productCurrent);
    this.initialHandlers();
  }

  closeModal() {
    this.$root.empty();
    this.$root.off();
  }
}

export default ProductDeleteView;
