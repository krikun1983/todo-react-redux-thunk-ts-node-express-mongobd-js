import MobileObject from './MobileObject.js';

const SpaceShip = function (position, size, speed, state, life) {
  MobileObject.call(this, position, size, speed);
  this.state = state;
  this.life = life;
}

SpaceShip.prototype = Object.create(MobileObject.prototype);
SpaceShip.prototype.constructor = SpaceShip;

export default SpaceShip;