export const Asteroid = function() {
  // this.asteroids = ['assets/img/asteroid.png', 'assets/img/asteroid2.png', 'assets/img/asteroid3.png'];
  this.pos = [];

  this.pos[0] = {
    x: 1024,
    y: 0,
  };

  this.move = () => {
    // this.pos = Array(3).fill({
    //   x: cvs.width,
    //   y: 0,
    // });


    for (let i = 0; i < this.pos.length; i++) {
      this.pos[i].x -= 2;
      // console.log(this.pos[i].x);
      // console.log(this.pos[i]);
      if (this.pos[i].x < -100) {
        this.pos.shift();
      }
      if (this.pos[i].x === -100) {
        this.pos.push({
          x: 1024,
          y: this.random(1, 600),
        })
      }
    }
  }

  this.update = function () {
    this.move();
  }
}

Asteroid.prototype.random = function (min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}