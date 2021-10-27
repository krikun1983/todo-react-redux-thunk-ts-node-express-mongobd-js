const RenderAudios = function () {
  this.audio = new Audio();
}

RenderAudios.prototype.createAudio = function (audioSrc) {
  this.audio.src = audioSrc;
  this.audio.play();
}

export const renderAudios = new RenderAudios();