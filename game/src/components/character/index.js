export default class AbstractCharacter {
  constructor(name, cfg) {
    this.name = name;
    this.cfg = cfg;
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
  }

  recalculateBreath() {
    if (this.breathInterval === this.cfg.breath.interval) {
      this.breathInterval = 0;
      this.cfg.breath.current += this.cfg.breath.step;
      if (this.cfg.breath.current > this.cfg.breath.max
        || this.cfg.breath.current < this.cfg.breath.min) {
        this.cfg.breath.step = -this.cfg.breath.step;
      }
    }
    this.breathInterval += 1;
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
