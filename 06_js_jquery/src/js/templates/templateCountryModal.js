const templateCountryModal = (country, product) => (`
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

export default templateCountryModal;
