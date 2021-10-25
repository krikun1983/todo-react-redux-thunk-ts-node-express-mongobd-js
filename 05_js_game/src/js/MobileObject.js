import { StaticObject } from './StaticObject.js';

const MobileObject = function (position, size, speed) {
  StaticObject.call(this, position, size);
  this.step = speed.step;
  this.dx = speed.dx;
  this.dy = speed.dy;
};

MobileObject.prototype = Object.create(StaticObject.prototype);
MobileObject.prototype.constructor = MobileObject;
MobileObject.prototype.moveLeftX = function () {
  this.dx = -this.step;
}
MobileObject.prototype.moveRightX = function () {
  this.dx = this.step;
}
MobileObject.prototype.moveUpY = function () {
  this.dy = -this.step;
}
MobileObject.prototype.moveDownY = function () {
  this.dy = this.step;
}
MobileObject.prototype.stop = function () {
  this.dx = 0;
  this.dy = 0;
}

export default MobileObject;