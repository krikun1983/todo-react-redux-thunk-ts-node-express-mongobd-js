import { Game } from './assets/js/Game.js';
import { Images } from './assets/js/Images.js';
import { World } from './assets/js/World.js';
import { View } from './assets/js/View.js';
import { SpaceShip } from './assets/js/SpaceShip.js';
import { Asteroid } from './assets/js/Asteroid.js';

const cvs = document.querySelector('canvas');
const asteroids = ['assets/img/asteroid.png', 'assets/img/asteroidTwo.png', 'assets/img/asteroidThree.png'];
const imgBg = new Images('./assets/img/bg.jpg');
const spaceShip = new Images('./assets/img/prometheus.png');
const asteroid = new Images('./assets/img/asteroid.png');

const game = new Game({
  world: new World(SpaceShip, Asteroid),
  view: new View(cvs, imgBg, spaceShip, asteroid),
  cvs: cvs,
});

game.init().then(() => game.start());