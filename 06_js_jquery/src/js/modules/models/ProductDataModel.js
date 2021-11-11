class ProductDataModel {
  constructor(props) {
    this.id = props ? props.id : '';
    this.name = props ? props.name : '';
    this.count = props ? props.count : 0;
    this.email = props ? props.email : '';
    this.price = props ? props.price : 0;
    this.delivery = props ? props.delivery : {
      country: '',
      city: [],
    };
  }
}

export default ProductDataModel;
