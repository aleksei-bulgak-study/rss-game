import Fireball from '../fireball';
import CONFIG from './files/config.json';

import AbstractCharacter from '../character';

const CONSTANTS = {
  start: {
    height: window.innerHeight * 0.85,
    width: document.body.offsetWidth * 0.35,
  },
  finish: {
    height: window.innerHeight * 0.85,
    width: document.body.offsetWidth * 0.6,
  },
};

export default class PersonComponent extends AbstractCharacter {
  constructor(canvasContext, name) {
    super(name, canvasContext, CONFIG);
    this.weapon = this.initWeaponComponent();
    this.build();
  }

  initWeaponComponent() {
    const weapon = new Fireball(this.ctx);
    weapon.start = CONSTANTS.start;
    weapon.finish = CONSTANTS.finish;
    return weapon;
  }

  build() {
    this.legs = this.loadCharacterPart(CONFIG.legs.image);
    this.leftArm = this.loadCharacterPart(CONFIG.arms.image.left);
    this.body = this.loadCharacterPart(CONFIG.body.image);
    this.head = this.loadCharacterPart(CONFIG.head.image);
    this.rightArm = this.loadCharacterPart(CONFIG.arms.image.right);
  }

  loadCharacterPart(type) {
    const image = new Image();
    image.src = PersonComponent.getPath(type);
    image.onload = () => this.onImageLoaded();
    return image;
  }

  onImageLoaded() {
    this.imagesLoadedCount += 1;
    if (this.imagesLoadedCount === CONFIG.numberOfParts) {
      this.draw();
    }
  }

  async attack(callback) {
    return this.weapon.performAttack(callback);
  }

  drawHead() {
    const heightPosition = document.body.offsetHeight * CONFIG.head.ratio.height
      - this.breath.current;
    const widthPosition = document.body.offsetWidth * CONFIG.head.ratio.width;
    const widthSize = this.head.width / CONFIG.scaleRation;
    const heightSize = this.head.height / CONFIG.scaleRation;
    this.ctx.drawImage(this.head, widthPosition, heightPosition, widthSize, heightSize);
  }

  drawBody() {
    const heightPosition = document.body.offsetHeight * CONFIG.body.ratio.height;
    const widthPosition = document.body.offsetWidth * CONFIG.body.ratio.width;
    const widthSize = this.body.width / CONFIG.scaleRation;
    const heightSize = this.body.height / CONFIG.scaleRation;
    this.ctx.drawImage(this.body, widthPosition, heightPosition, widthSize, heightSize);
  }

  drawLegs() {
    const heightPosition = document.body.offsetHeight * CONFIG.legs.ratio.height;
    const widthPosition = document.body.offsetWidth * CONFIG.legs.ratio.width;
    const widthSize = this.legs.width / CONFIG.scaleRation;
    const heightSize = this.legs.height / CONFIG.scaleRation;
    this.ctx.drawImage(this.legs, widthPosition, heightPosition, widthSize, heightSize);
  }

  drawLeftArm() {
    const heightPosition = document.body.offsetHeight * CONFIG.arms.ratio.left.height
      - this.breath.current;
    const widthPosition = document.body.offsetWidth * CONFIG.arms.ratio.left.width;
    const widthSize = this.leftArm.width / CONFIG.scaleRation;
    const heightSize = this.leftArm.height / CONFIG.scaleRation;
    this.ctx.save();
    this.ctx.translate(widthPosition, heightPosition);
    this._rotateHand();
    this.ctx.drawImage(this.leftArm, 0, 0, widthSize, heightSize);
    this.ctx.restore();
  }

  _rotateHand() {
    this.ctx.rotate(this.handAngle * Math.PI / 180);
    if (this.weapon.attack && this.handAngle > -this.cfg.arms.attack.angle) {
      this.handAngle -= this.cfg.arms.attack.step;
    } else if (!this.weapon.attack && this.handAngle < 0) {
      this.handAngle += this.cfg.arms.attack.step;
    }
    if (this.handAngle !== 0) {
      this.ctx.scale(-1, 1);
    }
  }

  drawRightArm() {
    const heightPosition = document.body.offsetHeight * CONFIG.arms.ratio.right.height
      - this.breath.current;
    const widthPosition = document.body.offsetWidth * CONFIG.arms.ratio.right.width;
    const widthSize = this.rightArm.width / CONFIG.scaleRation;
    const heightSize = this.rightArm.height / CONFIG.scaleRation;
    this.ctx.drawImage(
      this.rightArm,
      widthPosition, heightPosition,
      widthSize, heightSize,
    );
  }

  static getPath(type) {
    return CONFIG.image.path + type + CONFIG.image.ext;
  }
}
