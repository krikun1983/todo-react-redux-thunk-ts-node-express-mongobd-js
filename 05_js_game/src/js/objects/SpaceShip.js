import { AUDIOS } from '../path/index.js';
import { BULLET, CANVAS } from '../constants/index.js';
import { game } from '../Game.js';
import { Bullet, MobileObject } from './index.js';
import { renderAudios } from '../services/index.js';

const SpaceShip = function (position, size, speed, state, life, magazine) {
  MobileObject.call(this, position, size, speed);
  this.state = state;
  this.life = life;
  this.magazine = magazine;
}

SpaceShip.prototype = Object.create(MobileObject.prototype);
SpaceShip.prototype.constructor = SpaceShip;
SpaceShip.prototype.fire = function () {
  if (game.bullets.length === 0 || (game.bullets.filter(bullet => bullet.x < CANVAS.size.width).length > 0) && (game.bullets.length < this.magazine)) {
    const newBullet = new Bullet({ x: this.x + this.width - 10, y: this.y + 6 }, BULLET.size, BULLET.speed);
    game.bullets.push(newBullet);
    renderAudios.createAudio(AUDIOS.laserBlast);
  }
}

export default SpaceShip;