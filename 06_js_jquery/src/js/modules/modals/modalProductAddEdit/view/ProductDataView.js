import $ from 'jquery';
import {
  citiesData,
  countriesData,
} from '../../../../constants/data';
import {
  templateCountryModal,
  templateCityModal,
  templateCityMainModal,
  templateAddEditModal,
} from '../../../../templates';

class ProductDataView {
  constructor(props) {
    this.$root = $('.modal-add-edit-root');
    this.handlers = props.handlers;
    this.validation = props.validation;
  }

  render(productCurrent) {
    let countryRender = '';
    countriesData.forEach((country) => {
      countryRender += templateCountryModal(country, productCurrent);
    });
    const cityRender = templateCityMainModal(templateCityModal, countriesData, citiesData, productCurrent);
    this.$root.html(templateAddEditModal(productCurrent, countryRender, cityRender));
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
