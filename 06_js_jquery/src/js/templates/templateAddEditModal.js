const templateAddEditModal = (productCurrent, countryRender, cityRender) => (
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
            <button id="btn-submit" class="btn btn-primary" type="submit" data-action="update-yes">Add/Update</button>
            <button class="btn btn-secondary" type="button" data-action="update-no" >No</button>
          </div>
        </form>
      </div>
    </div>
  `
);

export default templateAddEditModal;
