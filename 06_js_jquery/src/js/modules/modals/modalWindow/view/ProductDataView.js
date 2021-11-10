import $ from 'jquery';

class ProductDataView {
  constructor(props) {
    this.$root = $('.modal--add_edit-root');
    this.handlers = props.handlers;
    this.validation = props.validation;
    this.city = '';
    this.delivery = '';
    this.cities = {
      Russia: [
        'Moscow',
        'Saint-Petersburg',
        'Saratov',
      ],
      USA: [
        'New York',
        'Los Angeles',
        'Chicago',
      ],
      Japan: [
        'Tokyo',
        'Osaka',
        'Nagasaki',
      ],
    };

    this.template = (productCurrent) => (
      `
        <div class="modal-root-container">
          <div class="modal-root">
            <img class="modal-root-cancel" data-action="update-no" src="../content/img/cancel-close.svg" alt="cancel"/>
            <form name="form_products" class="modal-root-form" action="">
              <label for="name" name="nameError">
                Name:
                <div class="modal-root_error_name"></div>
                <input id="name" name="name" value="${productCurrent.name}" type="text" data-info="info" data-action="update-name"/>
              </label>
              <label for="email">
                Supplier email:
                <div class="modal-root_error_email"></div>
                <input id="email" name="email" value="${productCurrent.email}" type="email" data-info="info" data-action="update-email" />
              </label>
              <label for="count">
                Count:
                <div class="modal-root_error_count"></div>
                <input id="count" name="count" value="${productCurrent.count}" type="number" data-info="info" data-action="update-count" />
              </label>
              <label for="price">
                Price:
                <input id="price" name="price" value="${productCurrent.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}" type="text" data-info="info" data-action="update-price"/>
              </label>
              <label for="delivery">
                Delivery:
                <select id="delivery" name="delivery" data-info="info" data-action="delivery" value=${this.delivery}>
                  <option value="" selected>Selected</option>
                  <option value="country">Country</option>
                  <option value="city">City</option>
                </select>
              </label>
              <label for="">
                Delivery Country: ${productCurrent.delivery.country ? productCurrent.delivery.country : ''}
                Delivery city: ${this.city}
              </label>
              <div class="class="modal-root-form_btns">
                <button id="btn-valid" class="btn btn-primary" type="submit" data-action="update-yes">Add/Update</button>
                <button class="btn btn-secondary" type="button" data-action="update-no" >No</button>
              </div>
            </form>
          </div>
        </div>
      `
    );
  }

  render(productCurrent) {
    this.$root.html(this.template(productCurrent));
    this.initHandlers();
  }

  onProductsChange(event) {
    const { name, value } = event.target;
    this.handlers.onProductsChange(name, value);
  }

  initHandlers() {
    this.$root.on('change', '[data-action="update-name"]', this.validation.all);
    this.$root.on('change', '[data-action="update-email"]', this.validation.all);
    this.$root.on('change', '[data-action="update-count"]', this.validation.all);
    this.$root.on('focus', '[data-action="update-price"]', this.validation.all);
    this.$root.on('blur', '[data-action="update-price"]', this.validation.all);

    this.$root.on('change', '[data-info="info"]', this.onProductsChange.bind(this));
    this.$root.on('click', '[data-action="update-yes"]', this.handlers.onSubmit);
    this.$root.on('click', '[data-action="update-no"]', this.handlers.onClose);
  }

  showModal(productCurrent) {
    if (productCurrent.delivery.city) {
      productCurrent.delivery.city.forEach((el) => {
        this.city += `${el},`;
      });
    }
    this.render(productCurrent);
  }

  closeModal() {
    this.$root.empty();
    this.$root.off();
  }
}

export default ProductDataView;
