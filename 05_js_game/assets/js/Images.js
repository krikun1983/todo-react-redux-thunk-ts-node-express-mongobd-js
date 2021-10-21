export const Images = function(src) {
  this.src = src;
  this.img = new Image();

  this.render = async function () {
    let src = this.src;
    let img = this.img;

    return new Promise(function (res) {
      img.src = src;
      img.onload = function () {
        res(this);
      }
    })
  }
}