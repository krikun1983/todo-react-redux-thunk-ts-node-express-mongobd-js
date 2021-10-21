import { Game } from './assets/js/Game.js';
import { Images } from './assets/js/Images.js';
import { World } from './assets/js/World.js';
import { View } from './assets/js/View.js';
import { SpaceShip } from './assets/js/SpaceShip.js';

const cvs = document.querySelector('canvas');
const imgBg = new Images('./assets/img/bg.jpg');
const spaceShip = new Images('./assets/img/prometheus.png');

const game = new Game({
  world: new World(SpaceShip),
  view: new View(cvs, imgBg, spaceShip),
});

game.init().then(() => game.start());