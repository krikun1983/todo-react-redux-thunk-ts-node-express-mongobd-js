export const Game = function ({ world, view, cvs }) {
  this.cvs = cvs;
  this.world = world;
  this.view = view;
  this.keys = new Set();
  this.loop = loop.bind(this);

  this.init = async function () {
    this.view.init();

    const activeKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', ' ', 'Enter'];
    const isResult = (el) => el;

    document.addEventListener('keydown', (event) => {
      event.preventDefault();

      if (activeKeys.some(isResult)) { this.keys.add(event.key) };
    })
    document.addEventListener('keyup', (event) => {
      event.preventDefault();

      if (activeKeys.some(isResult)) { this.keys.delete(event.key) };
    })
  }

  this.start = function () {
    requestAnimationFrame(this.loop);
  }

  function loop() {
    this.world.update(this.keys);
    this.view.update(this.world);

    requestAnimationFrame(this.loop);
  }
}