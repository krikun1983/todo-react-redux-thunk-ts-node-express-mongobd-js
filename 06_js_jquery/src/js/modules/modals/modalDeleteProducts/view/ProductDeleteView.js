import $ from 'jquery';

class ProductDeleteView {
  constructor(props) {
    this.$root = $('.modal-delete-root');
    this.handlers = props.handlers;
    this.template = (productCurrent) => (
      `
        <div class="modal-delete-container">
          <div class="modal-delete">
            <div class="modal-delete_product">Delete product <span>${productCurrent.name}</span>?</div>
            <div class="modal-delete_question">Are you sure you want to perform this action</div>
            <div class="modal-delete_btns">
              <button class="btn btn-primary" type="button" data-action="delete-yes">Yes</button>
              <button class="btn btn-secondary" type="button" data-action="delete-no" >No</button>
            </div>
          </div>
        </div>
      `
    );
  }

  render(productCurrent) {
    this.$root.html(this.template(productCurrent));
  }

  initHandlersDeleteModal() {
    this.$root.on('click', '[data-action="delete-yes"]', this.handlers.onSubmit);
    this.$root.on('click', '[data-action="delete-no"]', this.handlers.onClose);
  }

  showModal(productCurrent) {
    this.render(productCurrent);
    this.initHandlersDeleteModal();
  }

  closeModal() {
    this.$root.empty();
    this.$root.off();
  }
}

export default ProductDeleteView;
