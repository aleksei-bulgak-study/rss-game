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
  step: 3,
};

export default class Fireball {
  constructor(ctx) {
    this.ctx = ctx;
    this.attack = false;
    this.index = CONFIG.images.start;
    this.updateInterval = 0;
    this.images = [];
    this.loadImages();
  }

  performAttack(callback) {
    this.attack = true;
    this.draw(callback);
  }

  draw(callback) {
    if (this.attack) {
      if (this.point.width >= this.finishPoint.width && this.index === CONFIG.images.count) {
        this.index = CONFIG.images.start;
        this.updateInterval = 0;
        this.attack = false;
        callback();
        return;
      }
      if (this.index === CONFIG.images.indexOfSplash && this.point.width < this.finishPoint.width) {
        this.index = CONFIG.images.start;
      }
      if (this.point.width >= this.finishPoint.width && this.index < CONFIG.images.indexOfSplash) {
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
    window.requestAnimationFrame(() => this.draw(callback));
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
    this.point = start;
  }

  set finish(finish) {
    this.finishPoint = finish;
  }
}
