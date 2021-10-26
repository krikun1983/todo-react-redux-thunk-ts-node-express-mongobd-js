import MobileObject from './MobileObject.js';

const AsteroidTwo = function (position, size, speed, life) {
  MobileObject.call(this, position, size, speed);
  this.life = life;
}

AsteroidTwo.prototype = Object.create(MobileObject.prototype);
AsteroidTwo.prototype.constructor = AsteroidTwo;

export default AsteroidTwo;