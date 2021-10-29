import { MobileObject } from './index.js';

const Explosion = function (position, size, speed) {
  MobileObject.call(this, position, size, speed);
  this.timer = 60;
}

Explosion.prototype = Object.create(MobileObject.prototype);
Explosion.prototype.constructor = Explosion;
Explosion.prototype.timerUpdate = function () {
  this.timer -= 1;
}

export default Explosion;