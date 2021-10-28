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
const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');

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
  const btnsEvent = event.target;
  if (btnsEvent.classList.contains('btn-main-start')) {
    btnMainStart.classList.add('hidden');
    ModalRegistration.classList.remove('hidden');
  } else if (btnsEvent.classList.contains('form-btn-start')) {
    event.preventDefault();
    settings.name = document.querySelector('.modal-registration-name').value === ''
      ? 'Unknown'
      : document.querySelector('.modal-registration-name').value;
    settings.difficult = document.querySelector('.modal-registration-difficult').value;
    ModalRegistration.classList.add('hidden');
    btnsServices.classList.remove('hidden');
    gameLoop();
    renderAudios.createAudio(AUDIOS.begin);
  } else if (btnsEvent.classList.contains('form-btn-cancel')) {
    btnMainStart.classList.remove('hidden');
    ModalRegistration.classList.add('hidden');
  } else if (btnsEvent.classList.contains('btn-service-next')) {
    btnGameNext.classList.add('hidden');
    btnGamePause.classList.remove('hidden');
    gamePause();
  } else if (btnsEvent.classList.contains('btn-service-pause')) {
    btnGameNext.classList.remove('hidden');
    btnGamePause.classList.add('hidden');
    gamePause();
  } else if (btnsEvent.classList.contains('btn-service-game')) {
    window.location.reload();
  }
})

game.init();