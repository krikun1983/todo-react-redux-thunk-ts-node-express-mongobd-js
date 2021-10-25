import FIELD_BG from './constants/field-bg.js';

export const StaticObject = function (position, size) {
  this.x = position.x;
  this.y = position.y;

  this.width = size.width;
  this.height = size.height;
}

export const gameFieldBg = new StaticObject(FIELD_BG.position, FIELD_BG.size);