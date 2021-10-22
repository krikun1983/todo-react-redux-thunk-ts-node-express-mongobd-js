const SpaceShip = function () {
  this.xPos = 10;
  this.yPos = 300;
  this.step = 4;

  this.move = (key) => {
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

  this.update = function (key) {
    this.move(key);
  }
}

export default SpaceShip;