const ImagesLoad = function () {
  this.cvs = document.querySelector('canvas');
  this.ctx = this.cvs.getContext('2d');
  this.img = new Image();

  this.load = function (imgSrc, object) {
    let ctx = this.ctx;
    let img = this.img;

    img.onload = function () {
      ctx.drawImage(img, object.x, object.y, object.width, object.height);
    }
    img.src = imgSrc;
  }
}

export default ImagesLoad;