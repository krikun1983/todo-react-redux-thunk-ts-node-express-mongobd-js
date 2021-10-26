import { gamePause } from '../../index.js';
import Asteroid from './Asteroid.js';
import AsteroidTwo from './AsteroidTwo.js';
import ASTEROID from './constants/asteroid.js';
import CANVAS from './constants/canvas.js';
import HEART from './constants/heart.js';
import SPACE_SHIP from './constants/space-ship.js';
import collision from './utils/collision.js';
import IMAGES from './images/Images.js';
import { renderObject } from './RenderObject.js';
import SpaceShip from './SpaceShip.js';
import { gameFieldBg } from './StaticObject.js';
import randoms from './utils/randoms.js';

const Game = function () {
  this.spaceShip = new SpaceShip(SPACE_SHIP.position, SPACE_SHIP.size, SPACE_SHIP.speed, SPACE_SHIP.state, SPACE_SHIP.life, SPACE_SHIP.magazine);
  this.asteroids = [new Asteroid(ASTEROID.position, ASTEROID.size, ASTEROID.speed, ASTEROID.state, ASTEROID.life)];
  this.activeKeys = new Set();
  this.bullets = [];
  this.isPause = false;
  this.cvs = document.querySelector('canvas');
  this.ctx = this.cvs.getContext('2d');
  this.score = 0;
}

Game.prototype.init = function () {
  this.keyboarderMoveShip();
  renderObject.CreateImg(IMAGES.background, gameFieldBg);
}

Game.prototype.keyboarderMoveShip = function () {
  const activeKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Enter'];
  const isResult = (el) => el;

  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (activeKeys.some(isResult)) { this.activeKeys.add(event.key) };
    if (this.activeKeys.has('Enter')) { gamePause() };
    if (this.activeKeys.has(' ')) { this.spaceShip.fire() };
  })

  document.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (activeKeys.some(isResult)) { this.activeKeys.delete(event.key) };
  })
}

Game.prototype.render = function () {
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

  if (this.spaceShip.life) {
    for (let i = 0; i < this.spaceShip.life; i++) {
      renderObject.CreateImg(IMAGES.heart, { x: HEART.position.x + i * 50, y: HEART.position.y, width: HEART.size.width, height: HEART.size.height });
    }
  }

  for (let i = 0; i < this.bullets.length; i++) {
    renderObject.CreateImg(IMAGES.bullet, this.bullets[i]);
  }
}

Game.prototype.update = function () {
  if (this.spaceShip.state) {
    if (this.activeKeys.has('ArrowRight') && this.activeKeys.has('ArrowUp')) {
      this.spaceShip.moveRightUpX();
      this.spaceShip.x <= CANVAS.size.width - this.spaceShip.width ? this.spaceShip.x += this.spaceShip.dx : this.spaceShip.stop();
      this.spaceShip.y > 0 ? this.spaceShip.y += this.spaceShip.dy : this.spaceShip.stop();
    } else if (this.activeKeys.has('ArrowLeft') && this.activeKeys.has('ArrowUp')) {
      this.spaceShip.moveLeftUpX();
      this.spaceShip.x >= 0 ? this.spaceShip.x += this.spaceShip.dx : this.spaceShip.stop();
      this.spaceShip.y > 0 ? this.spaceShip.y += this.spaceShip.dy : this.spaceShip.stop();
    } else if (this.activeKeys.has('ArrowLeft') && this.activeKeys.has('ArrowDown')) {
      this.spaceShip.moveLeftDownX();
      this.spaceShip.x >= 0 ? this.spaceShip.x += this.spaceShip.dx : this.spaceShip.stop();
      this.spaceShip.y < CANVAS.size.height - this.spaceShip.height ? this.spaceShip.y += this.spaceShip.dy : this.spaceShip.stop();
    } else if (this.activeKeys.has('ArrowRight') && this.activeKeys.has('ArrowDown')) {
      this.spaceShip.moveRightDownX();
      this.spaceShip.x <= CANVAS.size.width - this.spaceShip.width ? this.spaceShip.x += this.spaceShip.dx : this.spaceShip.stop();
      this.spaceShip.y < CANVAS.size.height - this.spaceShip.height ? this.spaceShip.y += this.spaceShip.dy : this.spaceShip.stop();
    } else if (this.activeKeys.has('ArrowUp')) {
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
    if (item.x === 900) {
      if (randoms(1, 6) >= 3) {
        game.asteroids.push(new Asteroid({ x: ASTEROID.position.x, y: randoms(-20, 550) }, { width: randoms(150, 180), height: randoms(150, 180) }, ASTEROID.speed, ASTEROID.state, ASTEROID.life));
      } else {
        game.asteroids.push(new AsteroidTwo({ x: ASTEROID.position.x, y: randoms(-20, 550) }, ASTEROID.size, ASTEROID.speed, ASTEROID.state, ASTEROID.life + 3));
      }
    }
    if (item.x < -200) {
      game.asteroids.splice(0, 1);
      this.score++;
    }
    if (collision(this.spaceShip, item)) {
      this.spaceShip.life -= 1;
      game.asteroids.splice(i, 1);
      this.score += 3;
    }
    this.bullets.forEach((bullet, k) => {
      if (collision(item, bullet)) {
        item.life -= 1;
        if (item.life <= 0) {
          game.asteroids.splice(i, 1);
          if (item instanceof Asteroid) {
            this.score += 5;
          } else if (item instanceof AsteroidTwo) {
            this.score += 10;
          }
        }
        game.bullets.splice(k, 1);
      }
    });
  });

  if (this.spaceShip.life <= 0) {
    this.spaceShip.state = false;
  }

  this.bullets.forEach((bullet, i) => {
    if (bullet.dx < CANVAS.size.width) {
      bullet.moveRightX();
      bullet.x += bullet.dx;
    }
    if (bullet.x > CANVAS.size.width) {
      this.bullets.splice(i, 1);
    }
  })

  this.ctx.fillStyle = "#ffffff";
  this.ctx.font = "24px Verdana";
  this.ctx.fillText("Score: " + this.score, 10, this.cvs.height - 20);
}

export const game = new Game();