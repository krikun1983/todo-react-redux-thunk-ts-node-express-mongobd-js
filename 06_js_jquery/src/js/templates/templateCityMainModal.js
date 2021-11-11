const templateCityMainModal = (templateCityModal, countries, cityArr, product) => {
  let countryString = '';
  countries.forEach((country) => {
    countryString += `
      <div class="city_list city_${country} hidden">
        <p>City of ${country}</p>
        ${templateCityModal(country, cityArr, product)}
      </div>
    `;
  });

  return countryString;
};

export default templateCityMainModal;
