import $ from 'jquery';

class DataProductsForTableView {
  constructor(props) {
    this.$root = $('.table-container');
    this.searchValue = '';
    this.handlers = props.handlers;
    this.templateRowForTable = (product) => `
      <tr>
        <td>${product.name} - ${product.count}</td>
        <td>${product.price}</td>
        <td class="btns">
          <button type="button" class="btn btn-secondary" data-action="edit" data-productId="${product.id}">Edit</button>
          <button type="button" class="btn btn-secondary" data-action="delete" data-productId="${product.id}">Delete</button>
        </td>
      </tr>`;
  }

  render(products) {
    let rows = '';
    products.forEach((item) => {
      rows += this.templateRowForTable(item);
    });
    const table = `
      <form class="form-row row g-3">
        <div class="col-auto">
          <input type="text" class="form-control" placeholder="Фильтр по подстроке в имени товара" data-action="search-value"/>
        </div>
        <div class="col-auto">
          <button type="button" class="btn btn-secondary" data-action="search">Search</button>
        </div>
        <div class="col-auto btn-add">
          <button type="button" class="btn btn-secondary" data-action="add">Add products</button>
        </div>
      </form>
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
    this.listeners();
  }

  openEditModal(event) {
    const id = event.target.getAttribute('data-productId');
    this.handlers.openEditModal(id);
  }

  deleteProduct(event) {
    const id = event.target.getAttribute('data-productId');
    this.handlers.deleteProduct(id);
  }

  listeners() {
    this.$root.on('click', '[data-action="search"]', () => {
      this.handlers.searchProduct(this.searchValue);
      this.searchValue = '';
    });
    this.$root.on('input', 'input[data-action="search-value"]', (e) => {
      this.searchValue = e.target.value;
    });
    this.$root.on('click', '[data-action="add"]', () => { console.log('add'); });
    this.$root.on('click', '[data-action="edit"]', (e) => { this.openEditModal(e); });
    this.$root.on('click', '[data-action="delete"]', (e) => { this.deleteProduct(e); });
  }
}

export default DataProductsForTableView;
