import $ from 'jquery';
import ProductDataModel from '../../models/ProductDataModel.js';
import ProductDataView from './view/ProductDataView.js';

class ModalWindowController {
  constructor(initState, onSubmit) {
    this.onSubmitAction = onSubmit;
    this.productDataModel = new ProductDataModel(initState);
    this.productDataView = new ProductDataView({
      handlers: {
        onProductsChange: this.onProductsChange.bind(this),
        onSubmit: this.onSubmit.bind(this),
        onClose: this.onClose.bind(this),
      },
      validation: {
        all: ModalWindowController.validationAll.bind(this),
      },
    });
  }

  show() {
    this.productDataView.showModal(this.productDataModel);
  }

  onProductsChange(name, value) {
    if (name === 'country') {
      this.productDataModel.delivery[name] = value;
    }
    this.productDataModel[name] = value;
  }

  static validationName(name, nameErrors) {
    const reg = /  +/gm;
    const nameNew = name;
    const nameStr = nameNew.value.replace(reg, ' ').trim();

    const nameLen = nameStr.length;
    $(name).val(nameStr);
    if (nameLen === 0 || nameLen > 15) {
      $(name).addClass('error');
      $(nameErrors).text('Поле не может быть пустым или только из пробелов или не больше 15 символов!');
      return false;
    }
    $(nameErrors).text('');
    $(name).removeClass('error');
    return true;
  }

  static validationEmail(email, emailErrors) {
    const reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]{2,20}\.+[a-zA-Z0-9-.]{2,30}$/g;

    if (email.value.match(reg)) {
      $(email).removeClass('error');
      $(emailErrors).text('');
      return true;
    }
    $(email).addClass('error');
    $(emailErrors).text('Email не может быть пустым и должен соответствовать формату e-mail!');
    return false;
  }

  static validationCount(count) {
    if (count.value === '' || +count.value < 0) { $(count).val('0'); }
    const reg = /^[0-9]+$/g;

    if (count.value.match(reg)) {
      $(count).removeClass('error');
      return true;
    }
    $(count).addClass('error');
    return false;
  }

  static validationPrice(price) {
    if (price.value === '' || +price.value < 0) { $(price).val('0'); }

    const valueOfInput = parseFloat(price.value);

    $(price).on('focus', () => {
      const re = /[$,]/g;
      const valueNumberValue = price.value.replace(re, '');
      $(price).attr('type', 'number');
      $(price).val(valueNumberValue);
    });
    $(price).on('blur', () => {
      $(price).attr('type', 'text');
      $(price).val(valueOfInput.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
    });

    return true;
  }

  static validationDelivery(delivery) {
    const country = $('input[name="country"]:radio:checked').val();

    if (delivery.value === '') {
      $('.country_list').addClass('hidden');
      $('.city_list').addClass('hidden');
    } else if (delivery.value === 'country') {
      $('.country_list').removeClass('hidden');
      $('.city_list').addClass('hidden');
    } else if (delivery.value === 'city') {
      $('.country_list').addClass('hidden');
      $('.city_list').removeClass('hidden');
    }
    if (country) {
      return true;
    }
    return false;

    // if (delivery.value === 'country') {
    //   $('.country_list').removeClass('hidden');
    //   $('.city_list').addClass('hidden');
    // } else if (delivery.value === 'city') {
    //   $('.country_list').addClass('hidden');
    //   $('.city_list').removeClass('hidden');
    // }

    // if (delivery.value === 'country' && value === 'Russia') {
    //   $('.city_russia').removeClass('hidden');
    // } else if (delivery.value === 'country' && value === 'USA') {
    //   $('.city_usa').removeClass('hidden');
    // } else if (delivery.value === 'country' && value === 'Japan') {
    //   $('.city_japan').removeClass('hidden');
    // }
  }

  static validationAll() {
    const btnValid = document.querySelector('#btn-valid');
    const name = document.querySelector('#name');
    const nameError = document.querySelector('.modal-root_error_name');
    const email = document.querySelector('#email');
    const emailErrors = document.querySelector('.modal-root_error_email');
    const count = document.querySelector('#count');
    const price = document.querySelector('#price');
    const delivery = document.querySelector('#delivery');

    if (
      ModalWindowController.validationName(name, nameError)
      && ModalWindowController.validationEmail(email, emailErrors)
      && ModalWindowController.validationCount(count)
      && ModalWindowController.validationPrice(price)
      && ModalWindowController.validationDelivery(delivery)
    ) {
      btnValid.disabled = false;
      return true;
    }
    btnValid.disabled = true;
    return false;
  }

  async onSubmit(event) {
    event.preventDefault();

    if (ModalWindowController.validationAll()) {
      await this.onSubmitAction(this.productDataModel);
      this.productDataView.closeModal();
    }
    return false;
  }

  onClose() {
    this.productDataView.closeModal();
  }
}

export default ModalWindowController;
