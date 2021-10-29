import { game } from '../Game.js';

const gamePause = () => {
  if (!game.isPause) {
    game.isPause = true;
  } else if (game.isPause) {
    game.isPause = false;
  }
}

export default gamePause;