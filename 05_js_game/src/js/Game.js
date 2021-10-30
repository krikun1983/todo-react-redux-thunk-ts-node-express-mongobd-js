import { Asteroid, AsteroidWithBonus, SpaceShip, Enemy, Heart, Explosion, gameFieldBg } from './objects/index.js';
import { ASTEROID, ASTEROID_WITH_BONUS, CANVAS, ENEMY, EXPLOSION, HEART, SPACE_SHIP } from './constants/index.js';
import { collision, randoms, gamePause, settings } from './utils/index.js';
import { renderObject, renderAudios } from './services/index.js';
import { IMAGES, AUDIOS } from './path/index.js';

const Game = function () {
  this.spaceShip = new SpaceShip(SPACE_SHIP.position, SPACE_SHIP.size, SPACE_SHIP.speed, SPACE_SHIP.state, SPACE_SHIP.life, SPACE_SHIP.magazine);
  this.asteroids = [];
  this.activeKeys = new Set();
  this.bullets = [];
  this.isPause = false;
  this.cvs = document.querySelector('canvas');
  this.ctx = this.cvs.getContext('2d');
  this.score = 0;
  this.enemies = [];
  this.enemyBullets = [];
  this.bonuses = [];
  this.explosions = [];
}

Game.prototype.init = function () {
  this.keyboarderMoveShip();
  renderObject.CreateImg(IMAGES.background, gameFieldBg);
}

Game.prototype.keyboarderMoveShip = function () {
  const activeKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Enter'];
  const isResult = (el) => el;

  document.addEventListener('keydown', (event) => {
    if (activeKeys.some(isResult)) { this.activeKeys.add(event.key) };
    if (this.activeKeys.has('Enter')) { gamePause() };
    if (this.activeKeys.has(' ')) { this.spaceShip.fire() };
  })

  document.addEventListener('keyup', (event) => {
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
      } else if (this.asteroids[i].life && this.asteroids[i] instanceof AsteroidWithBonus) {
        renderObject.CreateImg(IMAGES.asteroidWithBonus, this.asteroids[i]);
      }
    }
  }

  for (let i = 0; i < this.explosions.length; i++) {
    renderObject.CreateImg(IMAGES.explosion, this.explosions[i]);
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
  const RECORDS = {
    name: settings.name,
    max_core: this.score,
  }

  if (this.spaceShip.state) {
    if (this.activeKeys.has('ArrowRight') && this.activeKeys.has('ArrowUp')) {
      this.spaceShip.x <= CANVAS.size.width - this.spaceShip.width && this.spaceShip.y > 0 ? this.spaceShip.moveRightUpX() : this.spaceShip.stop();
    } else if (this.activeKeys.has('ArrowLeft') && this.activeKeys.has('ArrowUp')) {
      this.spaceShip.x >= 0 && this.spaceShip.y > 0 ? this.spaceShip.moveLeftUpX() : this.spaceShip.stop();
    } else if (this.activeKeys.has('ArrowLeft') && this.activeKeys.has('ArrowDown')) {
      this.spaceShip.x >= 0 && this.spaceShip.y < CANVAS.size.height - this.spaceShip.height ? this.spaceShip.moveLeftDownX() : this.spaceShip.stop();
    } else if (this.activeKeys.has('ArrowRight') && this.activeKeys.has('ArrowDown')) {
      this.spaceShip.x && this.spaceShip.y < CANVAS.size.height - this.spaceShip.height <= CANVAS.size.width - this.spaceShip.width ? this.spaceShip.moveRightDownX() : this.spaceShip.stop();
    } else if (this.activeKeys.has('ArrowUp')) {
      this.spaceShip.y > 0 ? this.spaceShip.moveUpY() : this.spaceShip.stop();
    } else if (this.activeKeys.has('ArrowDown')) {
      this.spaceShip.y < CANVAS.size.height - this.spaceShip.height ? this.spaceShip.moveDownY() : this.spaceShip.stop();
    } else if (this.activeKeys.has('ArrowLeft')) {
      this.spaceShip.x >= 0 ? this.spaceShip.moveLeftX() : this.spaceShip.stop();
    } else if (this.activeKeys.has('ArrowRight')) {
      this.spaceShip.x <= CANVAS.size.width - this.spaceShip.width ? this.spaceShip.moveRightX() : this.spaceShip.stop();
    } else if (
      !(
        this.activeKeys.has('ArrowRight') &&
        this.activeKeys.has('ArrowDown') &&
        this.activeKeys.has('ArrowLeft') &&
        this.activeKeys.has('ArrowUp')
      )
    ) {
      this.spaceShip.x >= 0 ? this.spaceShip.x-- : this.spaceShip.stop();
      renderObject.CreateImg(IMAGES.dragonFire, { x: this.spaceShip.x - 34, y: this.spaceShip.y + 11, width: 50, height: 19 });
    }
  }

  if (this.asteroids.length === 0) {
    this.asteroids.push(new Asteroid({ x: ASTEROID.position.x, y: randoms(-20, 550) }, { width: randoms(150, 180), height: randoms(150, 180) }, ASTEROID.speed * settings.difficult, ASTEROID.life));
  }

  this.asteroids.forEach((item, i) => {
    item.moveLeftX();

    if (item.x === 900) {
      if (randoms(1, 6) >= 2) {
        this.asteroids.push(new Asteroid({ x: ASTEROID.position.x, y: randoms(-20, 550) }, { width: randoms(150, 180), height: randoms(150, 180) }, ASTEROID.speed * settings.difficult, ASTEROID.life));
      } else {
        this.asteroids.push(new AsteroidWithBonus({ x: ASTEROID_WITH_BONUS.position.x, y: randoms(-20, 550) }, ASTEROID_WITH_BONUS.size, ASTEROID_WITH_BONUS.speed * settings.difficult, ASTEROID_WITH_BONUS.life));
      }
    }
    if (item.x < -200) {
      this.asteroids.splice(0, 1);
      this.score > 0 ? this.score -= 1 : this.score = 0;
    }
    if (collision(this.spaceShip, item)) {
      this.spaceShip.life -= 1;
      this.asteroids.splice(i, 1);
      renderAudios.createAudio(AUDIOS.hit);
      this.explosions.push(new Explosion({ x: item.x, y: item.y }, EXPLOSION.size, EXPLOSION.speed));
      if (this.explosions[0].timer <= 30) {
        this.explosions.splice(i, 1);
      }
      this.score > 0 ? this.score -= 5 : this.score = 0;
    }
    this.bullets.forEach((bullet, k) => {
      if (collision(item, bullet)) {
        item.life -= 1;
        if (item.life <= 0) {
          this.asteroids.splice(i, 1);
          renderAudios.createAudio(AUDIOS.grenadeAsteroid);
          this.explosions.push(new Explosion({ x: item.x, y: item.y }, EXPLOSION.size, EXPLOSION.speed));
          if (this.explosions[0].timer <= 30) {
            this.explosions.splice(i, 1);
          }
          if (item instanceof Asteroid) {
            this.score += 5;
          } else if (item instanceof AsteroidWithBonus) {
            this.score += 8;
            this.bonuses.push(new Heart({ x: item.x + (item.width / 2), y: item.y + (item.height / 2) }, HEART.size, HEART.speed));
          }
        }
        this.bullets.splice(k, 1);
      }
    });
  });

  this.explosions.forEach(item => {
    item.moveLeftX();
    item.timerUpdate();
    if (item.timer < 30) {
      this.explosions.splice(0, 1);
    }
  })

  if (this.enemies.length === 0) {
    this.enemies.push(new Enemy({ x: ENEMY.position.x, y: randoms(-20, 550) }, ENEMY.size, ENEMY.speed * settings.difficult, ENEMY.life, ENEMY.magazine));
  }

  this.enemies.forEach((item, i) => {
    item.moveLeftX();
    if (item.x === 900) {
      this.enemies.push(new Enemy({ x: ENEMY.position.x, y: randoms(-20, 550) }, ENEMY.size, ENEMY.speed * settings.difficult, ENEMY.life, ENEMY.magazine));
    }
    if (item.x < -100) {
      this.enemies.splice(0, 1);
      this.score > 0 ? this.score -= 1 : this.score = 0;
    }
    if (collision(this.spaceShip, item)) {
      this.spaceShip.life -= 1;
      this.enemies.splice(i, 1);
      renderAudios.createAudio(AUDIOS.hit);
      this.explosions.push(new Explosion({ x: item.x, y: item.y }, { width: item.width, height: item.height }, EXPLOSION.speed));
      if (this.explosions[0].timer <= 30) {
        this.explosions.splice(i, 1);
      }
      this.score > 0 ? this.score -= 5 : this.score = 0;
    }
    this.bullets.forEach((bullet, k) => {
      if (collision(item, bullet)) {
        item.life -= 1;
        if (item.life <= 0) {
          this.enemies.splice(i, 1);
          this.explosions.push(new Explosion({ x: item.x, y: item.y }, { width: item.width, height: item.height }, EXPLOSION.speed));
          if (this.explosions[0].timer <= 30) {
            this.explosions.splice(i, 1);
          }
          renderAudios.createAudio(AUDIOS.grenade);
          if (item instanceof Enemy) {
            this.score += 10;
          }
        }
        this.bullets.splice(k, 1);
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
    if (!this.spaceShip.life) { renderAudios.createAudio(AUDIOS.gameOver) }
    const localStorageData = JSON.parse(localStorage.getItem(settings.difficult));
    if (localStorageData.max_core < this.score) {
      RECORDS.max_core = this.score;
      localStorage.setItem(settings.difficult, JSON.stringify(RECORDS));
    }
    this.localStorage = JSON.parse(localStorage.getItem(settings.difficult));
  }

  this.bullets.forEach((bullet, i) => {
    bullet.moveRightX();
    if (bullet.x > CANVAS.size.width) {
      this.bullets.splice(i, 1);
    }
  });

  this.enemyBullets.forEach((bullet, i) => {
    bullet.moveLeftX() - settings.difficult;
    if (bullet.x < CANVAS.position.x - 10) {
      this.enemyBullets.splice(i, 1);
    }
  });

  this.enemyBullets.forEach((bullet, i) => {
    if (collision(this.spaceShip, bullet)) {
      this.spaceShip.life -= 1;
      this.enemyBullets.splice(i, 1);
    }
  });

  this.bonuses.forEach((heart, i) => {
    heart.moveLeftX();
    if (collision(this.spaceShip, heart)) {
      this.spaceShip.life < 5 ? this.spaceShip.life += 1 : 0;
      renderAudios.createAudio(AUDIOS.bonus);
      this.bonuses.splice(i, 1);
    }
    if (heart.x < CANVAS.position.x - 10) {
      this.bonuses.splice(i, 1);
    }
  });

  const localStorageData = JSON.parse(localStorage.getItem(settings.difficult));
  this.ctx.fillStyle = "#ffffff";
  this.ctx.font = "24px Verdana";
  this.ctx.fillText(`Score: ${this.score}`, 10, this.cvs.height - 20);

  if (localStorageData === null) {
    localStorage.setItem(settings.difficult, JSON.stringify(RECORDS));
  } else {
    this.ctx.fillText(`Record: ${localStorageData.name} - ${localStorageData.max_core}`, 10, this.cvs.height - 570);
  }
}

export const game = new Game();