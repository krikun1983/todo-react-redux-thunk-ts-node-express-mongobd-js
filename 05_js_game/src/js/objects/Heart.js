import { MobileObject } from './index.js';

const Heart = function (position, size, speed) {
  MobileObject.call(this, position, size, speed);
}

Heart.prototype = Object.create(MobileObject.prototype);
Heart.prototype.constructor = Heart;

export default Heart;