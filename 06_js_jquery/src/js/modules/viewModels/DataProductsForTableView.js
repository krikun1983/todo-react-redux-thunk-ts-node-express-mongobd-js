import $ from 'jquery';

class DataProductsForTableView {
  constructor() {
    this.$root = $('.table');
    this.templateRowForTable = (product) => `
      <tr>
        <td>${product.name} - ${product.count}</td>
        <td>${product.price}</td>
        <td>
          <button>Edit</button>
          <button>Delete</button>
        </td>
      </tr>`;
  }

  render(products) {
    let rows = '';
    products.forEach((item) => {
      rows += this.templateRowForTable(item);
    });
    const table = `
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Price</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
    this.$root.html(table);
  }
}

export default DataProductsForTableView;
