export function World(SpaceShip) {
  this.spaceShip = new SpaceShip();

  this.update = function (keys) {
    this.spaceShip.update(keys);
  }
}