const templateCityModal = (country, cityArr, product) => {
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

export default templateCityModal;
