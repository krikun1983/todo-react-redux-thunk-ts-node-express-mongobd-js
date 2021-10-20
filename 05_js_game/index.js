import { Items } from './assets/js/items.js';

const cvs = document.querySelector('canvas');

function Game(cvs) {
  this.cvs = cvs;
  this.ctx = cvs.getContext('2d');
  this.xPos = 10;
  this.yPos = 300;
  this.step = 5;

  this.move = function (e) {
    if (e.key === 'ArrowUp') {
      this.yPos += this.yPos > 550 ? 0 : this.step;
    } else if (e.key === 'ArrowDown') {
      this.yPos -= this.yPos < 10 ? 0 : this.step;
    }
  }

  this.render = function (e = '') {
    this.move(e);

    // document.addEventListener('keydown', this.move.bind(this));
    const field = new Items('assets/img/bg.jpg', this.ctx, 0, 0);
    const spaceShip = new Items('assets/img/prometheus.png', this.ctx, this.xPos, this.yPos);
    field.render();
    spaceShip.render();
  }
}

const game = new Game(cvs);
game.render();
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    requestAnimationFrame(() => {
      game.render(e);
    })
  }
});
