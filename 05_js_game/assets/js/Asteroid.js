import { randoms } from './utils/random.js'

export const Asteroid = function () {
  this.pos = [];

  this.pos[0] = {
    x: 1024,
    y: 0,
  };

  this.move = () => {
    for (let i = 0; i < this.pos.length; i++) {
      this.pos[i].x -= 2;
      if (this.pos[i].x < -100) {
        this.pos.shift();
      }

      if (this.pos[i].x === 600) {
        this.pos.push({
          x: 1024 + 200,
          y: randoms(-20, 550),
        })
      }
    }
  }

  this.update = function () {
    this.move();
  }
}