const templateRowForTable = (product) => `
      <tr>
        <td class="name-action" data-action="edit" data-productId="${product.id}">${product.name}</td>
        <td>${product.count} counts</td>
        <td>${product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
        <td class="btns">
          <button type="button" class="btn btn-secondary" data-action="edit" data-productId="${product.id}">Edit</button>
          <button type="button" class="btn btn-secondary" data-action="delete" data-productId="${product.id}">Delete</button>
        </td>
      </tr>`;

export default templateRowForTable;
