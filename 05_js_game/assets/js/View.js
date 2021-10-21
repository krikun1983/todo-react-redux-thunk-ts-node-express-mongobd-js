export const View = function(cvs, imgBg, spaceShip) {
  this.cvs = cvs;
  this.ctx = cvs.getContext('2d');
  this.imgBg = imgBg;
  this.spaceShip = spaceShip;

  this.init = async function () {
    await this.imgBg.render();
    await this.spaceShip.render();
  }

  this.update = function (world) {
    this.clearScreen();
    this.renderBg();
    this.renderSpaceShip(world.spaceShip);
  }

  this.renderBg = function () {
    this.ctx.drawImage(this.imgBg.img, 0, 0)
  }

  this.renderSpaceShip = function (spaceShip) {
    this.ctx.drawImage(this.spaceShip.img, spaceShip.xPos, spaceShip.yPos)
  }

  this.clearScreen = function () {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
  }
}