import { Game } from './assets/js/Game.js';
import { Images } from './assets/js/Images.js';
import { World } from './assets/js/World.js';
import { View } from './assets/js/View.js';
import { SpaceShip } from './assets/js/SpaceShip.js';

const cvs = document.querySelector('canvas');
const imgBg = new Images('./assets/img/bg.jpg');
const spaceShip = new Images('./assets/img/prometheus.png');

const game = new Game({
  world: new World(SpaceShip),
  view: new View(cvs, imgBg, spaceShip),
});

game.init().then(() => game.start());

// function Game(cvs) {
//   this.cvs = cvs;
//   this.ctx = cvs.getContext('2d');
//   this.xPos = 10;
//   this.yPos = 300;
//   this.xPosBullet = 100;
//   this.yPosBullet = this.yPos + 10;
//   this.step = 5;

//   this.move = function (e) {
//     if (e.key === 'ArrowDown') {
//       this.yPos += this.yPos > 550 ? 0 : this.step;
//     } else if (e.key === 'ArrowUp') {
//       this.yPos -= this.yPos < 10 ? 0 : this.step;
//     }
//   }

//   this.fire = function (e) {
//     this.xPosBullet += 10;
//     this.yPosBullet = this.yPos + 10;
//   }

//   this.render = function (e = '') {
//     this.move(e);
//     this.fire(e);
//     // document.addEventListener('keydown', this.move.bind(this));
//     const field = new Images('assets/img/bg.jpg', this.ctx, 0, 0);
//     field.render();
//     const spaceShip = new Images('assets/img/prometheus.png', this.ctx, this.xPos, this.yPos);
//     spaceShip.render();
//     if (e.key === ' ') {
//       const bullet = new Images('assets/img/bullet.png', this.ctx, this.xPosBullet, this.yPosBullet);
//       bullet.render();
//     }
//   }
// }

// const games = new Game(cvs);
// games.render();
// document.addEventListener('keydown', (e) => {
//   if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === ' ') {
//     requestAnimationFrame(() => {
//       games.render(e);
//     })
//   }
// });
