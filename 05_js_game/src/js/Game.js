import Asteroid from './Asteroid.js';
import AsteroidTwo from './AsteroidTwo.js';
import ASTEROID from './constants/asteroid.js';
import CANVAS from './constants/canvas.js';
import SPACE_SHIP from './constants/space-ship.js';
import collision from './images/collision.js';
import IMAGES from './images/Images.js';
import { renderObject } from './RenderObject.js';
import SpaceShip from './SpaceShip.js';
import { gameFieldBg } from './StaticObject.js';
import randoms from './utils/randoms.js';

const Game = function () {
  this.spaceShip = new SpaceShip(SPACE_SHIP.position, SPACE_SHIP.size, SPACE_SHIP.speed, SPACE_SHIP.state, SPACE_SHIP.life);
  this.asteroids = [new Asteroid(ASTEROID.position, ASTEROID.size, ASTEROID.speed, ASTEROID.state, ASTEROID.life)];
  this.flagStart = false;
  this.activeKeys = new Set();
}

Game.prototype.init = function () {
  renderObject.CreateImg(IMAGES.background, gameFieldBg);
}

Game.prototype.keyboarderMoveShip = function () {
  const activeKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', ' ', 'Enter'];
  const isResult = (el) => el;

  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (activeKeys.some(isResult)) { this.activeKeys.add(event.key) };
  })
  document.addEventListener('keyup', (event) => {
    event.preventDefault();

    if (activeKeys.some(isResult)) { this.activeKeys.delete(event.key) };
  })
}

Game.prototype.render = async function () {
  renderObject.CreateImg(IMAGES.background, gameFieldBg);
  renderObject.CreateImg(IMAGES.spaceShip, this.spaceShip);

  if (this.asteroids.length) {
    for (let i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i].life && this.asteroids[i] instanceof Asteroid) {
        renderObject.CreateImg(IMAGES.asteroid, this.asteroids[i]);
      } else if (this.asteroids[i].life && this.asteroids[i] instanceof AsteroidTwo) {
        renderObject.CreateImg(IMAGES.asteroidTwo, this.asteroids[i]);
      }
    }
  }
}

Game.prototype.update = function () {
  if (this.spaceShip.state) {
    this.keyboarderMoveShip();
    if (this.activeKeys.has('ArrowUp')) {
      this.spaceShip.moveUpY();
      this.spaceShip.y > 0 ? this.spaceShip.y += this.spaceShip.dy : this.spaceShip.stop();
    } else if (this.activeKeys.has('ArrowDown')) {
      this.spaceShip.moveDownY();
      this.spaceShip.y < CANVAS.size.height - this.spaceShip.height ? this.spaceShip.y += this.spaceShip.dy : this.spaceShip.stop();
    } else if (this.activeKeys.has('ArrowLeft')) {
      this.spaceShip.moveLeftX();
      this.spaceShip.x >= 0 ? this.spaceShip.x += this.spaceShip.dx : this.spaceShip.stop();
    } else if (this.activeKeys.has('ArrowRight')) {
      this.spaceShip.moveRightX();
      this.spaceShip.x <= CANVAS.size.width - this.spaceShip.width ? this.spaceShip.x += this.spaceShip.dx : this.spaceShip.stop();
    }
  }
  this.asteroids.forEach((item, i) => {
    item.moveLeftX();
    item.x += item.dx;
    if (item.x === 600) {
      if (randoms(1, 6) >= 3) {
        game.asteroids.push(new Asteroid({ x: ASTEROID.position.x, y: randoms(-20, 550) }, { width: randoms(150, 180), height: randoms(150, 180) }, ASTEROID.speed, ASTEROID.state, ASTEROID.life));
      } else {
        game.asteroids.push(new AsteroidTwo({ x: ASTEROID.position.x, y: randoms(-20, 550) }, ASTEROID.size, ASTEROID.speed, ASTEROID.state, ASTEROID.life));
      }
    }
    if (item.x < -200) {
      game.asteroids.splice(0, 1);
    }
    if (collision(this.spaceShip, item)) {
      this.spaceShip.life -= 1;
      game.asteroids.splice(i, 1);
    }
  });

  if (this.spaceShip.life <= 0) {
    this.spaceShip.state = false;
  }

}

export const game = new Game();