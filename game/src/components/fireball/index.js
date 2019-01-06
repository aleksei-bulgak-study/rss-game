const CONFIG = {
  images: {
    count: 11,
    indexOfSplash: 5,
    start: 1,
    updateInterval: 5,
    scale: 1 / 4,
    path: './images/fireball/fireball_',
    ext: '.png',
  },
  audio: {
    path: './audio/fireball_attack.mp3',
  },
  step: 5,
};

export default class Fireball {
  constructor(ctx) {
    this.ctx = ctx;
    this.attack = false;
    this.index = CONFIG.images.start;
    this.updateInterval = 0;
    this.images = [];
    this.audio = new Audio(CONFIG.audio.path);
    this.loadImages();
  }

  performAttack(callback) {
    this.attack = true;
    return this.draw(callback);
  }

  draw(callback) {
    return new Promise((resolve) => {
      this._playSound();
      this._draw(callback, resolve);
    });
  }

  _playSound() {
    this.audio.play();
  }

  _stopSound() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  _draw(callback, resolve) {
    if (this.reqId) {
      cancelAnimationFrame(this.reqId);
    }
    if (this.attack) {
      if (this.point.width >= this.finishPoint.width && this.index === CONFIG.images.count) {
        this.index = CONFIG.images.start;
        this.updateInterval = 0;
        this.start = this.startPoint;
        this.attack = false;
        this._stopSound();
        callback();
        resolve();
      }
      if (this.index === CONFIG.images.indexOfSplash
        && this.point.width < this.finishPoint.width) {
        this.index = CONFIG.images.start;
      }
      if (this.point.width >= this.finishPoint.width
        && this.index < CONFIG.images.indexOfSplash) {
        this.index = CONFIG.images.indexOfSplash;
      }
      const img = this.images[this.index];
      const height = img.height * CONFIG.images.scale;
      const width = img.width * CONFIG.images.scale;
      this.ctx.drawImage(img, this.point.width, this.point.height, width, height);
      if (this.updateInterval === CONFIG.images.updateInterval) {
        this.index += 1;
        this.updateInterval = 0;
      }
      this.updateInterval += 1;

      if (this.index < CONFIG.images.indexOfSplash) {
        this.point.width += CONFIG.step;
      }
    }
    this.reqId = window.requestAnimationFrame(() => this._draw(callback, resolve));
  }

  loadImages() {
    for (let i = CONFIG.images.start; i <= CONFIG.images.count; i += 1) {
      const image = new Image();
      image.src = CONFIG.images.path + i + CONFIG.images.ext;
      this.images[i] = image;
    }
  }

  set show(attack) {
    this.attack = attack;
  }

  set start(start) {
    this.startPoint = start;
    this.point = JSON.parse(JSON.stringify(start));
  }

  set finish(finish) {
    this.finishPoint = finish;
  }
}
