const CONST = {
  breath: {
    intervalStep: 1,
    default: 0,
  },
  death: {
    period: 2,
  },
};

export default class AbstractCharacter {
  constructor(name, ctx, cfg) {
    this.name = name;
    this.cfg = cfg;
    this.ctx = ctx;
    this.name = name;
    this.hp = cfg.hp.value;
    this.breath = {
      interval: 0,
      current: CONST.breath.default,
    };
    this.imagesLoadedCount = 0;
    this.handAngle = 0;
    if (!new.target) {
      throw Error('It is not allowed to create direct instance of AbstractCharacter');
    }
  }

  draw() {
    this.recalculateBreath();
    this.drawLegs();
    this.drawLeftArm();
    this.drawBody();
    this.drawRightArm();
    this.drawHead();
    this.drawHP();
    this.drawName();
    this._requestAnimationFrame();
  }

  _requestAnimationFrame() {
    this._cancelAnimationFrame();
    this.reqId = requestAnimationFrame(this.draw.bind(this));
  }

  _cancelAnimationFrame() {
    if (this.reqId) {
      cancelAnimationFrame(this.reqId);
    }
  }

  async attack(callback) {
    return callback();
  }

  async death() {
    this._cancelAnimationFrame();
    this.deathTime = performance.now();
    return new Promise((resolve) => {
      this._death(resolve);
    });
  }

  _death(resolve) {
    if (this._getExectionTime(this.deathTime) > CONST.death.period) {
      resolve();
      return;
    }
    const heightPosition = document.body.offsetHeight - this.dead.height - 10;
    const widthPosition = document.body.offsetWidth * this.cfg.body.ratio.width;
    this.ctx.drawImage(this.dead, widthPosition, heightPosition);
    this._cancelAnimationFrame();
    this.reqId = requestAnimationFrame(() => this._death(resolve));
  }

  _getExectionTime(start) {
    return (performance.now() - start) / 1000;
  }

  recalculateBreath() {
    if (this.breath.interval === this.cfg.breath.interval) {
      this.breath.interval = CONST.breath.default;
      this.breath.current += this.cfg.breath.step;
      if (this.breath.current > this.cfg.breath.max
        || this.breath.current < this.cfg.breath.min) {
        this.cfg.breath.step = -this.cfg.breath.step;
      }
    }
    this.breath.interval += CONST.breath.intervalStep;
  }

  drawName() {
    const heightPosition = document.body.offsetHeight * this.cfg.name.position.height;
    const widthPosition = document.body.offsetWidth * this.cfg.name.position.width;

    this.ctx.font = this.cfg.text.style;
    this.ctx.fillText(this.name, widthPosition, heightPosition);
  }

  drawHP() {
    const heightPosition = document.body.offsetHeight * this.cfg.hp.position.height;
    const widthPosition = document.body.offsetWidth * this.cfg.hp.position.width;

    this.ctx.fillStyle = this.getHpStatusColor();
    this.ctx.font = this.cfg.text.style;
    this.ctx.fillText(this.hp, widthPosition, heightPosition);
    this.ctx.save();
  }

  getHpStatusColor() {
    let current = this.cfg.hp.status.NORMAL.color;
    if (this.hp < this.cfg.hp.status.AVERAGE.value) {
      current = this.cfg.hp.status.AVERAGE.color;
    }
    if (this.hp < this.cfg.hp.status.CRITICAL.value) {
      current = this.cfg.hp.status.CRITICAL.color;
    }
    return current;
  }

  set health(value) {
    if (this.hp > value) {
      this.hp -= value;
    } else {
      this.hp = 0;
    }
  }

  get health() {
    return this.hp;
  }
}
