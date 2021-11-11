import $ from 'jquery';
import { citiesData, countriesData } from '../../../../constants/data';

class ProductDataView {
  constructor(props) {
    this.$root = $('.modal-add-edit-root');
    this.handlers = props.handlers;
    this.validation = props.validation;

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

    this.templateCityOfCountry = (country, cityArr, product) => {
      let cityString = '';
      cityArr[country].forEach((city) => {
        cityString += `
          <div class="form-check">
            <input
              class="form-check-input"
              name="city"
              type="checkbox"
              value=${city}
              id="city_${city}"
              data-info="info"
              data-action="update-delivery-city"
              ${product.delivery.city.includes(city) ? 'checked' : ''} />
            <label class="form-check-label" for="city_${city}">
              ${city}
            </label>
          </div>
        `;
      });
      return cityString;
    };

    this.templateCity = (countries, cityArr, product) => {
      let countryString = '';
      countries.forEach((country) => {
        countryString += `
          <div class="city_list city_${country} hidden">
            <p>City of ${country}</p>
            ${this.templateCityOfCountry(country, cityArr, product)}
          </div>
        `;
      });

      return countryString;
    };

    this.template = (productCurrent, countryRender, cityRender) => (
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
                  <option value="city" disabled>City</option>
                </select>

                <div class="country_list hidden">
                  <p>Country</p>
                  ${countryRender}
                </div>
                ${cityRender}
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
    let countryRender = '';
    countriesData.forEach((country) => {
      countryRender += this.templateCountry(country, productCurrent);
    });
    const cityRender = this.templateCity(countriesData, citiesData, productCurrent);
    this.$root.html(this.template(productCurrent, countryRender, cityRender));
    this.initHandlers();
  }

  onProductsChange(event) {
    const { name, value } = event.target;
    const checked = [];
    $('input:checkbox:checked').each(function() {
      checked.push($(this).val());
    });

    this.handlers.onProductsChange(name, value, checked);
  }

  initHandlers() {
    this.$root.on('change', '[data-action="update-name"]', this.validation.all);
    this.$root.on('change', '[data-action="update-email"]', this.validation.all);
    this.$root.on('change', '[data-action="update-count"]', this.validation.all);
    this.$root.on('focus', '[data-action="update-price"]', this.validation.all);
    this.$root.on('blur', '[data-action="update-price"]', this.validation.all);
    this.$root.on('change', '[data-action="update-delivery"]', this.validation.all);
    this.$root.on('change', '[data-action="update-delivery-country"]', () => {
      $('body input:checkbox').prop('checked', false);
    });
    this.$root.on('change', '[data-action="update-delivery-country"]', this.validation.all);
    this.$root.on('change', '[data-action="update-delivery-city"]', this.validation.all);

    this.$root.on('change', '[data-info="info"]', this.onProductsChange.bind(this));
    this.$root.on('click', '[data-action="update-yes"]', this.handlers.onSubmit);
    this.$root.on('click', '[data-action="update-no"]', this.handlers.onClose);
  }

  showModal(productCurrent) {
    this.render(productCurrent);
  }

  closeModal() {
    this.$root.empty();
    this.$root.off();
  }
}

export default ProductDataView;
