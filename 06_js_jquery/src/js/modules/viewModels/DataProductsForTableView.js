import $ from 'jquery';

class DataProductsForTableView {
  constructor(props) {
    this.$root = $('.table-container');
    this.searchValue = '';
    this.statusSortName = false;
    this.statusSortPrice = false;
    this.handlers = props.handlers;
    this.templateRowForTable = (product) => `
      <tr>
        <td class="name-action" data-action="edit" data-productId="${product.id}">${product.name}</td>
        <td>${product.count} counts</td>
        <td>${product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
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
            <th colspan="2">Name <span class="sort-name" data-action="sort-name">${this.statusSortName ? '▽' : '△'}</span></th>
            <th>Price <span class="sort-price" data-action="sort-price">${this.statusSortPrice ? '△' : '▽'}</span></th>
            <th class="table-action">Action</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
    this.$root.html(table);
  }

  sortFieldProductsTable(event, field) {
    const targetClick = event.target;
    if (targetClick.matches('.sort-name')) {
      this.statusSortName = !this.statusSortName;
      this.handlers.sortFieldProductsTable(field, this.statusSortName);
    } else {
      this.statusSortPrice = !this.statusSortPrice;
      this.handlers.sortFieldProductsTable(field, this.statusSortPrice);
    }
  }

  openAddModal() {
    this.handlers.openAddModal();
  }

  openEditModal(event) {
    const id = event.target.getAttribute('data-productId');
    this.handlers.openEditModal(id);
  }

  openDeleteModal(event) {
    const id = event.target.getAttribute('data-productId');
    this.handlers.openDeleteModal(id);
  }

  listeners() {
    this.$root.on('click', '[data-action="search"]', () => {
      this.handlers.searchProduct(this.searchValue);
      this.searchValue = '';
    });
    this.$root.on('input', 'input[data-action="search-value"]', (e) => {
      this.searchValue = e.target.value;
    });
    this.$root.on('click', '[data-action="sort-name"]', (e) => { this.sortFieldProductsTable(e, 'name'); });
    this.$root.on('click', '[data-action="sort-price"]', (e) => { this.sortFieldProductsTable(e, 'price'); });
    this.$root.on('click', '[data-action="add"]', () => { this.openAddModal(); });
    this.$root.on('click', '[data-action="edit"]', (e) => { this.openEditModal(e); });
    this.$root.on('click', '[data-action="delete"]', (e) => { this.openDeleteModal(e); });
  }
}

export default DataProductsForTableView;
