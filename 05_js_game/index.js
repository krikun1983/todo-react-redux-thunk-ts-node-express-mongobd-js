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
    if (game.localStorage.max_core > game.score) {
      ctx.fillText(`Game Over. Your game score - ${game.score}`, 250, 290);
    } else {
      ctx.fillText(`Game Over. Congratulations ${game.localStorage.name}!!!`, 220, 300);
      ctx.fillText(`You has set a new record - ${game.localStorage.max_core}`, 280, 350);
    }
  }
  window.requestAnimationFrame(() => {
    gameLoop();
  });
}

body.addEventListener('click', (event) => {
  listeners(event, gameLoop);
});

game.init();


