import $ from 'jquery';

class ProductDataView {
  constructor(props) {
    this.$root = $('.modal-root');
    this.city = '';
    this.delivery = '';
    this.template = (productCurrent) => (
      `
        <div class="modal-root__container">
          <div class="modal-root__wrapper">
            <form>
              <label for="name">
                Name:
                <input id="name" name="name" value="${productCurrent.name}" type="text" />
              </label>
              <label for="email">
                Supplier email:
                <input id="email" name="email" value="${productCurrent.email}" type="email" />
              </label>
              <label for="count">
                Count:
                <input id="count" name="count" value="${productCurrent.count}" type="number" />
              </label>
              <label for="price">
                Price:
                <input id="price" name="count" value="${productCurrent.price}" type="number" />
              </label>
              <label for="delivery">
                Delivery:
                <select id="delivery" name="delivery" data-action="delivery" value=${this.delivery}>
                  <option value="" selected>Selected</option>
                  <option value="country">Country</option>
                  <option value="city">City</option>
                </select>
              </label>
              <label for="price">
                Delivery Country: ${productCurrent.delivery.country ? productCurrent.delivery.country : ''}
                Delivery city: ${this.city}
              </label>
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

  onSelectChange(event) {
    const { name, value } = event.target;
    this.delivery = value;
  }

  initHandlers() {
    this.$root.on('change', '[data-action="delivery"]', this.onSelectChange.bind(this));
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
  }
}

export default ProductDataView;
