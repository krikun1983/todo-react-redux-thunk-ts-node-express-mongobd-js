import MobileObject from './MobileObject.js';

const Asteroid = function (position, size, speed, life) {
  MobileObject.call(this, position, size, speed);
  this.life = life;
}

Asteroid.prototype = Object.create(MobileObject.prototype);
Asteroid.prototype.constructor = Asteroid;

export default Asteroid;