import collision from './utils/collision.js';

const View = function (cvs, imgBg, spaceShip, asteroid) {
  this.cvs = cvs;
  this.ctx = cvs.getContext('2d');
  this.imgBg = imgBg;
  this.spaceShip = spaceShip;
  this.asteroid = asteroid;

  this.init = async function () {
    await this.imgBg.load();
    await this.spaceShip.load();
    await this.asteroid.load();
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
      if (collision(spaceShip, this.spaceShip, asteroid, this.asteroid, 1)
      ) { location.reload(); }

      this.ctx.drawImage(this.asteroid.img, asteroid.pos[1].x, asteroid.pos[1].y);
    }
    if (collision(spaceShip, this.spaceShip, asteroid, this.asteroid, 0)
    ) { location.reload(); }
    this.ctx.drawImage(this.asteroid.img, asteroid.pos[0].x, asteroid.pos[0].y);
  }

  this.clearScreen = function () {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
  }
}

export default View;