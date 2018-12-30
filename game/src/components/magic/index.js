const CONFIG = {
  images: {
    count: 5,
    start: 1,
    scale: 1,
    updateInterval: 5,
    path: './images/magic/magic_',
    ext: '.png',
  },
  step: 5,
  time: 2,
  numberOfMillisInSecond: 1000,
};

export default class Magic {
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
    this.start = performance.now();
    return this.draw(callback);
  }

  draw(callback) {
    return new Promise((resolve) => {
      this._draw(callback, resolve);
    });
  }

  _draw(callback, resolve) {
    if (this.reqId) {
      cancelAnimationFrame(this.reqId);
    }
    if (this.attack) {
      if (this._getExectionTime() >= CONFIG.time) {
        this.index = CONFIG.images.start;
        this.updateInterval = 0;
        this.attack = false;
        callback();
        resolve();
      }
      if (this.index > CONFIG.images.count) {
        this.index = CONFIG.images.start;
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
    }
    this.reqId = window.requestAnimationFrame(() => this._draw(callback, resolve));
  }

  _getExectionTime() {
    return (performance.now() - this.start) / CONFIG.numberOfMillisInSecond;
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

  set position(position) {
    this.point = JSON.parse(JSON.stringify(position));
  }
}
