import { renderAudios } from '../services/index.js';
import { AUDIOS } from '../path/index.js';
import { gamePause } from './index.js';

export const settings = {
  name: '',
  difficult: '',
};
const btnMainStart = document.querySelector('.btn-main-start');
const modalRegistration = document.querySelector('.modal-registration-window');
const modalInfo = document.querySelector('.modal-info');
const btnsServices = document.querySelector('.btns-services');
const btnGameNext = document.querySelector('.btn-service-next');
const btnGamePause = document.querySelector('.btn-service-pause');

export const listeners = (event, gameLoop) => {
  const btnsEvent = event.target;
  if (btnsEvent.classList.contains('btn-main-start')) {
    btnMainStart.classList.add('hidden');
    modalRegistration.classList.remove('hidden');
  } else if (btnsEvent.classList.contains('form-btn-start')) {
    event.preventDefault();
    settings.name = document.querySelector('.modal-registration-name').value === ''
      ? 'Unknown'
      : document.querySelector('.modal-registration-name').value;
    settings.difficult = document.querySelector('.modal-registration-difficult').value;
    modalRegistration.classList.add('hidden');
    btnsServices.classList.remove('hidden');
    gameLoop();
    renderAudios.createAudio(AUDIOS.begin);
  } else if (btnsEvent.classList.contains('form-btn-cancel') || btnsEvent.classList.contains('modal-registration-window')) {
    btnMainStart.classList.remove('hidden');
    modalRegistration.classList.add('hidden');
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
  } else if (btnsEvent.classList.contains('btn-info')) {
    modalInfo.classList.toggle('hidden');
  } else if (btnsEvent.classList.contains('modal-info')) {
    modalInfo.classList.toggle('hidden');
  }
}