import { ImagesLoad } from './index.js';

const RenderObject = function () {
  this.cvs = document.querySelector('canvas');
  this.ctx = this.cvs.getContext('2d');
}

RenderObject.prototype.CreateImg = function (imgSrc, object) {
  new ImagesLoad().load(imgSrc, object);
}

export const renderObject = new RenderObject();