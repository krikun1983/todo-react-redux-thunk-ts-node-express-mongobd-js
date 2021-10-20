export const Items = function (src, ctx, xPos, yPos) {
  this.ctx = ctx;
  this.src = src;
  this.xPos = xPos;
  this.yPos = yPos;
  this.img = new Image();

  this.render = function () {
    this.img.onload = () => {
      this.ctx.drawImage(this.img, this.xPos, this.yPos);
    }
    this.img.src = this.src;
  }

}