import { game } from './src/js/Game.js';

const btnGameMainStart = document.querySelector('.btn-main-start');
const btnsServices = document.querySelector('.btns-services');
const btnGameNext = document.querySelector('.btn-service-next');
const btnGamePause = document.querySelector('.btn-service-pause');
const btnGameNew = document.querySelector('.btn-service-game');

export const gamePause = () => {
  if (!game.isPause) {
    game.isPause = true;
  } else if (game.isPause) {
    game.isPause = false;
  }
}

const gameLoop = () => {
  if (game.spaceShip.state && !game.isPause) {
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

btnGameNew.addEventListener('click', () => {
  window.location.reload();
});

btnGameNext.addEventListener('click', () => {
  btnGameNext.style.display = 'none';
  btnGamePause.style.display = 'inline-block';
  gamePause();
});

btnGamePause.addEventListener('click', () => {
  btnGameNext.style.display = 'inline-block';
  btnGamePause.style.display = 'none';
  gamePause();
});

btnGameMainStart.addEventListener('click', () => {
  btnGameMainStart.style.display = 'none';
  btnsServices.style.display = 'flex';
  // game.keyboarderMoveShip();
  gameStart();
});

game.init();