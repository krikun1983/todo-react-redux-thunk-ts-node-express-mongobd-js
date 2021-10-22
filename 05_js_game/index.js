import Game from './src/js/Game.js';
import Images from './src/js/Images.js';
import World from './src/js/World.js';
import View from './src/js/View.js';
import SpaceShip from './src/js/SpaceShip.js';
import Asteroid from './src/js/Asteroid.js';

const cvs = document.querySelector('canvas');
const imgBg = new Images('./src/assets/img/bg.jpg');
const spaceShip = new Images('./src/assets/img/prometheus.png');
const asteroid = new Images('./src/assets/img/asteroid.png');

const game = new Game({
  world: new World(SpaceShip, Asteroid),
  view: new View(cvs, imgBg, spaceShip, asteroid),
});

game.init().then(() => game.start());