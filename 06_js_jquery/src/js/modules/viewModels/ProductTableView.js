import $ from 'jquery';
import { templateRowForTable, templateTable } from '../../templates';
import ModalProductAddEditController from '../modals/modalProductAddEdit/ModalProductAddEditController';

class ProductTableView {
  constructor(props) {
    this.$root = $('.table-container');
    this.searchValue = '';
    this.statusSortName = false;
    this.statusSortPrice = false;
    this.handlers = props.handlers;
  }

  render(products) {
    let rows = '';
    products.forEach((item) => {
      rows += templateRowForTable(item);
    });
    const table = templateTable(rows, this.statusSortName, this.statusSortPrice);
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
    ModalProductAddEditController.validationAll();
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

export default ProductTableView;
