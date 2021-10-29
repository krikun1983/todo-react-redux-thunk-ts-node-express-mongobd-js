import { MobileObject } from './index.js';

const Bullet = function (position, size, speed) {
  MobileObject.call(this, position, size, speed);
}

Bullet.prototype = Object.create(MobileObject.prototype);
Bullet.prototype.constructor = Bullet;

export default Bullet;