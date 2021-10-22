import { randoms } from './utils/random.js'

const World = function (SpaceShip, Asteroid) {
  this.asteroidsPos = null;
  this.spaceShip = new SpaceShip();
  this.asteroid = new Asteroid();

  this.setAsteroids = function (data) {
    this.asteroidsPos = data.map(() => {
      return {
        x: 1024,
        y: randoms(-20, 550),
      }
    });
  }

  this.update = function (keys) {
    this.spaceShip.update(keys);
    this.asteroid.update();
  }
}

export default World;