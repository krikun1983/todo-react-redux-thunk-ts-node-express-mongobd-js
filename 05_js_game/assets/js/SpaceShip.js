export function SpaceShip() {
  // this.direction = 0;
  this.xPos = 10;
  this.yPos = 300;
  this.step = 4;

  this.update = function (key) {
    if (key.has('ArrowUp')) {
      this.yPos -= this.yPos < 10 ? 0 : this.step;
    } else if (key.has('ArrowDown')) {
      this.yPos += this.yPos > 550 ? 0 : this.step;
    } else if (key.has('ArrowLeft')) {
      this.xPos -= this.xPos < 10 ? 0 : this.step;
    } else if (key.has('ArrowRight')) {
      this.xPos += this.xPos > 910 ? 0 : this.step;
    }
  }
}