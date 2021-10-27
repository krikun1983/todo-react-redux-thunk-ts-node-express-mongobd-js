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
import Enemy from './Enemy.js';
import ENEMY from './constants/enemy.js';
import ASTEROID_TWO from './constants/asteroidTwo.js';
import Heart from './Heart.js';

const MAX_SCORE = 'maxScore';

const Game = function () {
  this.spaceShip = new SpaceShip(SPACE_SHIP.position, SPACE_SHIP.size, SPACE_SHIP.speed, SPACE_SHIP.state, SPACE_SHIP.life, SPACE_SHIP.magazine);
  this.asteroids = [new Asteroid(ASTEROID.position, ASTEROID.size, ASTEROID.speed, ASTEROID.life)];
  this.activeKeys = new Set();
  this.bullets = [];
  this.isPause = false;
  this.cvs = document.querySelector('canvas');
  this.ctx = this.cvs.getContext('2d');
  this.score = 0;
  this.enemies = [];
  this.enemyBullets = [];
  this.bonuses = [];
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
  if (this.spaceShip.state) {
    renderObject.CreateImg(IMAGES.dragonFire, { x: this.spaceShip.x - 24, y: this.spaceShip.y + 11, width: 40, height: 20 });
  }
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

  if (this.enemies.length) {
    for (let i = 0; i < this.enemies.length; i++) {
      renderObject.CreateImg(IMAGES.enemy, this.enemies[i]);
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

  for (let i = 0; i < this.enemyBullets.length; i++) {
    renderObject.CreateImg(IMAGES.bulletEnemy, this.enemyBullets[i]);
  }

  for (let i = 0; i < this.bonuses.length; i++) {
    renderObject.CreateImg(IMAGES.heart, this.bonuses[i]);
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
    } else if (
      !(
        this.activeKeys.has('ArrowRight') &&
        this.activeKeys.has('ArrowDown') &&
        this.activeKeys.has('ArrowLeft') &&
        this.activeKeys.has('ArrowUp')
      )
    ) {
      this.spaceShip.moveLeftX();
      this.spaceShip.x >= 0 ? this.spaceShip.x-- : this.spaceShip.stop();
      renderObject.CreateImg(IMAGES.dragonFire, { x: this.spaceShip.x - 34, y: this.spaceShip.y + 11, width: 50, height: 19 });
    }
  }

  this.asteroids.forEach((item, i) => {
    item.moveLeftX();
    item.x += item.dx;
    if (item.x === 900) {
      if (randoms(1, 6) >= 2) {
        game.asteroids.push(new Asteroid({ x: ASTEROID.position.x, y: randoms(-20, 550) }, { width: randoms(150, 180), height: randoms(150, 180) }, ASTEROID.speed, ASTEROID.life));
      } else {
        game.asteroids.push(new AsteroidTwo({ x: ASTEROID_TWO.position.x, y: randoms(-20, 550) }, ASTEROID_TWO.size, ASTEROID_TWO.speed, ASTEROID_TWO.life));
      }
    }
    if (item.x < -200) {
      game.asteroids.splice(0, 1);
      this.score--;
    }
    if (collision(this.spaceShip, item)) {
      this.spaceShip.life -= 1;
      game.asteroids.splice(i, 1);
      this.score -= 5;
    }
    this.bullets.forEach((bullet, k) => {
      if (collision(item, bullet)) {
        item.life -= 1;
        if (item.life <= 0) {
          game.asteroids.splice(i, 1);
          if (item instanceof Asteroid) {
            this.score += 5;
          } else if (item instanceof AsteroidTwo) {
            this.score += 8;
            this.bonuses.push(new Heart({ x: item.x + (item.width / 2), y: item.y + (item.height / 2) }, HEART.size, HEART.speed));
          }
        }
        game.bullets.splice(k, 1);
      }
    });
  });

  if (this.enemies.length === 0) {
    game.enemies.push(new Enemy({ x: ENEMY.position.x, y: randoms(-20, 550) }, ENEMY.size, ENEMY.speed, ENEMY.life, ENEMY.magazine));
  }

  this.enemies.forEach((item, i) => {
    item.moveLeftX();
    item.x += item.dx;
    if (item.x === 900) {
      game.enemies.push(new Enemy({ x: ENEMY.position.x, y: randoms(-20, 550) }, ENEMY.size, ENEMY.speed, ENEMY.life, ENEMY.magazine));
    }
    if (item.x < -100) {
      game.enemies.splice(0, 1);
      this.score--;
    }
    if (collision(this.spaceShip, item)) {
      this.spaceShip.life -= 1;
      game.enemies.splice(i, 1);
      this.score -= 5;
    }
    this.bullets.forEach((bullet, k) => {
      if (collision(item, bullet)) {
        item.life -= 1;
        if (item.life <= 0) {
          game.enemies.splice(i, 1);
          if (item instanceof Enemy) {
            this.score += 10;
          }
        }
        game.bullets.splice(k, 1);
      }
    });
  });

  this.enemies.forEach((item) => {
    if (this.spaceShip.y + 20 > item.y && this.spaceShip.y - 20 < item.y) {
      item.fire();
    }
  });

  if (this.spaceShip.life <= 0) {
    this.spaceShip.state = false;
    if (localStorage.getItem(MAX_SCORE) < this.score) {
      localStorage.setItem(MAX_SCORE, this.score);
    }
  }

  this.bullets.forEach((bullet, i) => {
    bullet.moveRightX();
    bullet.x += bullet.dx;
    if (bullet.x > CANVAS.size.width) {
      this.bullets.splice(i, 1);
    }
  });

  this.enemyBullets.forEach((bullet, i) => {
    bullet.moveLeftX();
    bullet.x += bullet.dx - 2;
    if (bullet.x < CANVAS.position.x - 10) {
      this.enemyBullets.splice(i, 1);
    }
  });

  this.enemyBullets.forEach((bullet, i) => {
    if (collision(this.spaceShip, bullet)) {
      this.spaceShip.life -= 1;
      game.enemyBullets.splice(i, 1);
    }
  });

  this.bonuses.forEach((heart, i) => {
    if (collision(this.spaceShip, heart)) {
      this.spaceShip.life < 5 ? this.spaceShip.life += 1 : 0;
      this.bonuses.splice(i, 1);
    }
  });

  this.ctx.fillStyle = "#ffffff";
  this.ctx.font = "24px Verdana";
  this.ctx.fillText(`Score: ${this.score >= 0 ? this.score : 0}`, 10, this.cvs.height - 20);
  this.ctx.fillText(`MaxScore: ${localStorage.getItem(MAX_SCORE) === null ? localStorage.setItem(MAX_SCORE, 0) : localStorage.getItem(MAX_SCORE)}`, 10, this.cvs.height - 570);
}

export const game = new Game();