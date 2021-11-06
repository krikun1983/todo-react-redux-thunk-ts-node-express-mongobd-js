import $ from 'jquery';

class DataProductsForTableView {
  constructor() {
    this.$root = $('.table-container');
    this.templateRowForTable = (product) => `
      <tr>
        <td>${product.name} - ${product.count}</td>
        <td>${product.price}</td>
        <td class="btns">
          <button type="button" class="btn btn-secondary">Edit</button>
          <button type="button" class="btn btn-secondary">Delete</button>
        </td>
      </tr>`;
  }

  render(products) {
    let rows = '';
    products.forEach((item) => {
      rows += this.templateRowForTable(item);
    });
    const table = `
      <table class="table table-striped table-hover caption-top">
        <caption>List of products</caption>
        <thead class="table-dark">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
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
