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
    this.productDataModel[name] = value;
  }

  static validationName(name, nameErrors) {
    const nameLen = name.value.trim().length;
    const nameErrorsNew = nameErrors;
    if (nameLen === 0 || nameLen > 15) {
      name.classList.add('error');
      nameErrorsNew.textContent = 'Поле не может быть пустым или только из пробелов или не больше 15 символов!';
      name.focus();
      return false;
    }
    nameErrorsNew.textContent = '';
    name.classList.remove('error');
    return true;
  }

  static validationEmail(email, emailErrors) {
    const { value } = email;
    const emailErrorsNew = emailErrors;
    const letters = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]{2,20}\.+[a-zA-Z0-9-.]{2,30}$/g;

    if (value.match(letters)) {
      email.classList.remove('error');
      emailErrorsNew.textContent = '';
      return true;
    }
    email.classList.add('error');
    emailErrorsNew.textContent = 'Email не может быть пустым и должен соответствовать формату e-mail!';
    return false;
  }

  static validationCount(count, countErrors) {
    const { value } = count;
    const countErrorsNew = countErrors;
    const letters = /^[0-9]+$/g;

    if (value.match(letters)) {
      count.classList.remove('error');
      countErrorsNew.textContent = '';
      return true;
    }
    count.classList.add('error');
    countErrorsNew.textContent = 'Count не может быть пустым и можно вводить только цифры. Другие символы не допускаются!';
    return false;
  }

  static validationAll() {
    const btnValid = document.querySelector('#btn-valid');
    const name = document.querySelector('#name');
    const nameError = document.querySelector('.modal-root_error_name');
    const email = document.querySelector('#email');
    const emailErrors = document.querySelector('.modal-root_error_email');
    const count = document.querySelector('#count');
    const countErrors = document.querySelector('.modal-root_error_count');

    if (
      ModalWindowController.validationName(name, nameError)
      && ModalWindowController.validationEmail(email, emailErrors)
      && ModalWindowController.validationCount(count, countErrors)
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
      this.productDataView.closeModal();
    }

    // await this.onSubmitAction(this.productDataModel);

    return false;
  }

  onClose() {
    this.productDataView.closeModal();
  }
}

export default ModalWindowController;
