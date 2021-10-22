export function World(SpaceShip, Asteroid) {
  this.spaceShip = new SpaceShip();
  this.asteroid = new Asteroid();

  this.update = function (keys) {
    this.spaceShip.update(keys);
    this.asteroid.update();
  }
}