const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');

const canvasText = (game) => {
  ctx.fillStyle = "#ffffff";
  ctx.font = "30px Verdana";
  if (game.localStorage.max_core > game.score) {
    ctx.fillText(`Game Over. Your game score - ${game.score}`, 250, 290);
  } else {
    ctx.fillStyle = 'red';
    ctx.fillText(`Game Over. Congratulations ${game.localStorage.name}!!!`, 220, 300);
    ctx.fillText(`You has set a new record - ${game.localStorage.max_core}`, 280, 350);
  }
}

export default canvasText;
