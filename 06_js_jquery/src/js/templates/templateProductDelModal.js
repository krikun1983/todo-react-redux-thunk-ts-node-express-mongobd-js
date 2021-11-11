const templateProductDelModal = (productCurrent) => (
  `
    <div class="modal-delete-container">
      <div class="modal-delete">
        <div class="modal-delete_product">Delete product <span>${productCurrent.name}</span>?</div>
        <div class="modal-delete_question">Are you sure you want to perform this action</div>
        <div class="modal-delete_btns">
          <button class="btn btn-primary" type="button" data-action="delete-yes">Yes</button>
          <button class="btn btn-secondary" type="button" data-action="delete-no" >No</button>
        </div>
      </div>
    </div>
  `
);

export default templateProductDelModal;
