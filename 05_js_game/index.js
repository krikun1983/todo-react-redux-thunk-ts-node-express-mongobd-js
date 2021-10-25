import { game } from './src/js/Game.js';

const body = document.body;
const btnGameMainStart = document.querySelector('.btn-main-start');
const btnsServices = document.querySelector('.btns-services');
const btnGameNext = document.querySelector('.btn-service-next');
const btnGamePause = document.querySelector('.btn-service-pause');

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

body.addEventListener('click', (event) => {
  const btnsEvent = event.target;
  if (btnsEvent.classList.contains('btn-main-start')) {
    btnGameMainStart.style.display = 'none';
    btnsServices.style.display = 'flex';
    gameStart();
  } else if (btnsEvent.classList.contains('btn-service-next')) {
    btnGameNext.style.display = 'none';
    btnGamePause.style.display = 'inline-block';
    gamePause();
  } else if (btnsEvent.classList.contains('btn-service-pause')) {
    btnGameNext.style.display = 'inline-block';
    btnGamePause.style.display = 'none';
    gamePause();
  } else if (btnsEvent.classList.contains('btn-service-game')) {
    window.location.reload();
  }
})

game.init();