import AUDIOS from './src/js/audio/audio.js';
import { game } from './src/js/Game.js';
import { renderAudios } from './src/js/RenderAudios.js';

const body = document.body;
const btnMainStart = document.querySelector('.btn-main-start');
const ModalRegistration = document.querySelector('.modal-registration');
const btnsServices = document.querySelector('.btns-services');
const btnGameNext = document.querySelector('.btn-service-next');
const btnGamePause = document.querySelector('.btn-service-pause');
const settings = {};

export const gamePause = () => {
  if (!game.isPause) {
    game.isPause = true;
  } else if (game.isPause) {
    game.isPause = false;
  }
}

const gameLoop = () => {
  if (game.spaceShip.state && !game.isPause) {
    game.update(settings);
    game.render();
  }
  window.requestAnimationFrame(() => {
    gameLoop();
  });
}

body.addEventListener('click', (event) => {
  const btnsEvent = event.target;
  if (btnsEvent.classList.contains('btn-main-start')) {
    btnMainStart.style.display = 'none';
    ModalRegistration.style.display = 'block';
  } else if (btnsEvent.classList.contains('form-btn-start')) {
    event.preventDefault();
    settings.name = document.querySelector('.modal-registration-name').value === ''
      ? 'Unknown'
      : document.querySelector('.modal-registration-name').value;
    settings.difficult = document.querySelector('.modal-registration-difficult').value;
    ModalRegistration.style.display = 'none';
    btnsServices.style.display = 'flex';
    gameLoop();
    renderAudios.createAudio(AUDIOS.begin);
  } else if (btnsEvent.classList.contains('form-btn-cancel')) {
    btnMainStart.style.display = 'block';
    ModalRegistration.style.display = 'none';
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