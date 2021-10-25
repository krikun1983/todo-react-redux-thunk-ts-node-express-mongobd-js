import { game } from './src/js/Game.js';

const btnGameStart = document.querySelector('.btn-start');

const gameLoop = () => {
  if (game.spaceShip.state) {
    game.update();
    game.render();
  }
  window.requestAnimationFrame(() => {
    gameLoop();
  });
}

const gameStart = () => {
  gameLoop();
}

btnGameStart.addEventListener('click', () => {
  btnGameStart.style.display = 'none';
  gameStart();
});

game.init();