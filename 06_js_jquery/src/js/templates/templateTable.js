const templateTable = (rows, statusSortName, statusSortPrice) => `
      <form class="form-row row g-3">
        <div class="col-auto">
          <input type="text" class="form-control" placeholder="Фильтр по подстроке в имени товара" data-action="search-value"/>
        </div>
        <div class="col-auto">
          <button type="button" class="btn btn-secondary" data-action="search">Search</button>
        </div>
        <div class="col-auto btn-add">
          <button id="btn-add" type="button" class="btn btn-secondary" data-action="add">Add products</button>
        </div>
      </form>
      <table class="table table-striped table-hover caption-top">
        <caption>List of products</caption>
        <thead class="table-dark">
          <tr>
            <th colspan="2">Name <span class="sort-name" data-action="sort-name">${statusSortName ? '▽' : '△'}</span></th>
            <th>Price <span class="sort-price" data-action="sort-price">${statusSortPrice ? '△' : '▽'}</span></th>
            <th class="table-action">Action</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;

export default templateTable;
