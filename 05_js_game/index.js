import { game } from './src/js/Game.js';
import { canvasText, listeners } from './src/js/utils/index.js';

const body = document.body;

const gameLoop = () => {
  if (game.spaceShip.state && !game.isPause) {
    game.update();
    game.render();
  } else if (!game.spaceShip.state) {
    canvasText(game);
  }
  window.requestAnimationFrame(() => {
    gameLoop();
  });
}

body.addEventListener('click', (event) => {
  listeners(event, gameLoop);
});

game.init();


