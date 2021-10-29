import { MobileObject } from './index.js';

const AsteroidWithBonus = function (position, size, speed, life) {
  MobileObject.call(this, position, size, speed);
  this.life = life;
}

AsteroidWithBonus.prototype = Object.create(MobileObject.prototype);
AsteroidWithBonus.prototype.constructor = AsteroidWithBonus;

export default AsteroidWithBonus;