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

    this.country = ['Russia', 'USA', 'Japan'];
    this.templateCountry = (country, product) => (`
      <div class="form-check">
        <input
        class="form-check-input"
        name="country"
        type="radio" value="${country}"
        id="country_${country}"
        data-info="info"
        data-action="update-delivery-country"
        ${country === product.delivery.country ? 'checked' : ''} />
        <label class="form-check-label" for="country_${country}">
          ${country}
        </label>
        </div>
    `);

    this.template = (productCurrent, countryRender) => (
      `
        <div class="modal-root-container">
          <div class="modal-root">
            <img class="modal-root-cancel" data-action="update-no" src="../content/img/cancel-close.svg" alt="cancel"/>
            <form class="modal-root-form" name="form_products" action="">
              <div class="modal-root-form__top">
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
                  <input id="count" name="count" value="${productCurrent.count}" type="number" data-info="info" data-action="update-count" />
                </label>
                <label for="price">
                  Price:
                  <input id="price" name="price" value="${productCurrent.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}" type="text" data-info="info" data-action="update-price"/>
                </label>
              </div>
              <label for="delivery">
                Delivery:
                <select id="delivery" name="delivery" data-action="update-delivery">
                  <option value="" selected>Selected</option>
                  <option value="country">Country</option>
                  <option value="city">City</option>
                </select>

                <div class="country_list hidden">
                  <p>Country</p>
                  ${countryRender}
                </div>

                <div class="city_list city_russia hidden">
                  <p>City</p>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Moscow" id="city_moscow" data-action="update-delivery-city">
                    <label class="form-check-label" for="city_moscow">
                      Moscow
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Saint-Petersburg" id="city_saintPetersburg" data-action="update-delivery-city">
                    <label class="form-check-label" for="city_saintPetersburg">
                      Saint-Petersburg
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Saratov" id="country_saratov" data-action="update-delivery-city">
                    <label class="form-check-label" for="country_saratov">
                      Saratov
                    </label>
                  </div>
                </div>

                <div class="city_list city_usa hidden">
                  <p>City</p>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="New York" id="city_new_york" data-action="update-delivery-city">
                    <label class="form-check-label" for="city_new_york">
                      New York
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Los Angeles" id="city_los_angeles" data-action="update-delivery-city">
                    <label class="form-check-label" for="city_los_angeles">
                      Los Angeles
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Chicago" id="country_chicago" data-action="update-delivery-city">
                    <label class="form-check-label" for="country_chicago">
                      Chicago
                    </label>
                  </div>
                </div>

                <div class="city_list city_japan hidden">
                  <p>City</p>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Tokyo" id="city_tokyo" data-action="update-delivery-city">
                    <label class="form-check-label" for="city_tokyo">
                      Tokyo
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Osaka" id="city_osaka" data-action="update-delivery-city">
                    <label class="form-check-label" for="city_osaka">
                      Osaka
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Nagasaki" id="country_nagasaki" data-action="update-delivery-city">
                    <label class="form-check-label" for="country_nagasaki">
                      Nagasaki
                    </label>
                  </div>
                </div>
              </label>
              <div class="modal-root-form_btns">
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
    let countryItem = '';
    this.country.forEach((country) => {
      countryItem += this.templateCountry(country, productCurrent);
    });
    this.$root.html(this.template(productCurrent, countryItem));
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
    this.$root.on('change', '[data-action="update-delivery"]', this.validation.all);
    this.$root.on('change', '[data-action="update-delivery-country"]', this.validation.all);
    this.$root.on('change', '[data-action="update-delivery-city"]', this.validation.all);

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
