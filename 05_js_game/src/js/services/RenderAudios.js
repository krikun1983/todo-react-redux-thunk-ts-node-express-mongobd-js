const RenderAudios = function () {
  this.audio = new Audio();
}

RenderAudios.prototype.createAudio = function (audioSrc) {
  let audio = this.audio;
  audio.onloadeddata = function () {
    audio.play();
  }
  this.audio.src = audioSrc;
}

export const renderAudios = new RenderAudios();