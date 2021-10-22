export const View = function (cvs, imgBg, spaceShip, asteroid) {
  this.cvs = cvs;
  this.ctx = cvs.getContext('2d');
  this.imgBg = imgBg;
  this.spaceShip = spaceShip;
  this.asteroid = asteroid;

  this.init = async function () {
    await this.imgBg.render();
    await this.spaceShip.render();
    await this.asteroid.render();
  }

  this.update = function (world) {
    this.clearScreen();
    this.renderBg();
    this.renderAsteroid(world.spaceShip, world.asteroid);
    this.renderSpaceShip(world.spaceShip);
  }

  this.renderBg = function () {
    this.ctx.drawImage(this.imgBg.img, 0, 0)
  }

  this.renderSpaceShip = function (spaceShip) {
    this.ctx.drawImage(this.spaceShip.img, spaceShip.xPos, spaceShip.yPos);
  }

  this.renderAsteroid = function (spaceShip, asteroid) {
    if (asteroid.pos[1]) {
      if (
        spaceShip.xPos + this.spaceShip.img.width > asteroid.pos[1].x &&
        spaceShip.xPos < asteroid.pos[1].x + this.asteroid.img.width &&
        spaceShip.yPos < asteroid.pos[1].y + this.asteroid.img.height &&
        spaceShip.yPos + this.spaceShip.img.height > asteroid.pos[1].y
        ) { location.reload(); }

      this.ctx.drawImage(this.asteroid.img, asteroid.pos[1].x, asteroid.pos[1].y);
      }
    if (
      spaceShip.xPos + this.spaceShip.img.width > asteroid.pos[0].x &&
      spaceShip.xPos < asteroid.pos[0].x + this.asteroid.img.width &&
      spaceShip.yPos < asteroid.pos[0].y + this.asteroid.img.height &&
      spaceShip.yPos + this.spaceShip.img.height > asteroid.pos[0].y
      ) { location.reload(); }
    this.ctx.drawImage(this.asteroid.img, asteroid.pos[0].x, asteroid.pos[0].y);
  }

  this.clearScreen = function () {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
  }
}