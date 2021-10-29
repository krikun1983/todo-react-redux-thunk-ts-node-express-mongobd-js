import { game } from './src/js/Game.js';
import { listeners } from './src/js/utils/index.js';

const body = document.body;
const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');

const gameLoop = () => {
  if (game.spaceShip.state && !game.isPause) {
    game.update();
    game.render();
  } else if (!game.spaceShip.state) {
    ctx.fillStyle = "#ffffff";
    ctx.font = "30px Verdana";
    ctx.fillText(`Game Over ${game.score >= 0 ? game.score : 0}`, 430, 300);
  }
  window.requestAnimationFrame(() => {
    gameLoop();
  });
}

body.addEventListener('click', (event) => {
  listeners(event, gameLoop);
});

game.init();