import MobileObject from './MobileObject.js';

const AsteroidTwo = function (position, size, speed, state, life) {
  MobileObject.call(this, position, size, speed);
  this.state = state;
  this.life = life;
}

AsteroidTwo.prototype = Object.create(MobileObject.prototype);
AsteroidTwo.prototype.constructor = AsteroidTwo;

export default AsteroidTwo;