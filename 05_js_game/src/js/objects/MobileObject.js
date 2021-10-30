import { StaticObject } from './StaticObject.js';

const MobileObject = function (position, size, speed) {
  StaticObject.call(this, position, size);
  this.speed = speed;
};

MobileObject.prototype = Object.create(StaticObject.prototype);
MobileObject.prototype.constructor = MobileObject;
MobileObject.prototype.moveLeftX = function () {
  this.x -= this.speed;
}
MobileObject.prototype.moveRightX = function () {
  this.x += this.speed;
}
MobileObject.prototype.moveUpY = function () {
  this.y -= this.speed;
}
MobileObject.prototype.moveDownY = function () {
  this.y += this.speed;
}
MobileObject.prototype.moveRightUpX = function () {
  this.x += this.speed;
  this.y -= this.speed;
}
MobileObject.prototype.moveLeftUpX = function () {
  this.x -= this.speed;
  this.y -= this.speed;
}
MobileObject.prototype.moveLeftDownX = function () {
  this.x -= this.speed;
  this.y += this.speed;
}
MobileObject.prototype.moveRightDownX = function () {
  this.x += this.speed;
  this.y += this.speed;
}
MobileObject.prototype.stop = function () {
  this.x += 0;
  this.y += 0;
}

export default MobileObject;