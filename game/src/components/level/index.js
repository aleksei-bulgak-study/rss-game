const CONST = {
  position: {
    width: 0.1,
    height: 0.1,
  },
  text: {
    prefix: 'Level: ',
    style: '48px serif',
  },
};

export default class LevelInfoComponent {
  constructor(canvasContext, session) {
    this.ctx = canvasContext;
    this.session = session;
  }

  draw() {
    this._drawLevel();
    this._requestAnimationFrame();
  }

  _drawLevel() {
    const heightPosition = document.body.offsetHeight * CONST.position.height;
    const widthPosition = document.body.offsetWidth * CONST.position.width;

    this.ctx.save();
    this.ctx.font = CONST.text.style;
    this.ctx.fillText(CONST.text.prefix + this.session.level, widthPosition, heightPosition);
    this.ctx.restore();
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
}
