import Utils from '../../services/util';
import CONFIG from './files/config.json';

import AbstractCharacter from '../character';

import Magic from '../magic';

const CONSTANTS = {
  position: {
    height: window.innerHeight * (CONFIG.arms.attack.position.height),
    width: document.body.offsetWidth * CONFIG.arms.attack.position.width,
  },
};

export default class MonsterComponent extends AbstractCharacter {
  constructor(canvasContext, name) {
    super(name, canvasContext, CONFIG);
    this.weapon = this.initWeaponComponent();
    this.build();
  }

  initWeaponComponent() {
    const weapon = new Magic(this.ctx);
    weapon.position = CONSTANTS.position;
    return weapon;
  }

  async attack(callback) {
    return this.weapon.performAttack(callback);
  }

  build() {
    this.legs = this.loadRandom(CONFIG.legs.image);
    this.leftArm = this.loadRandom(CONFIG.arms.image);
    this.body = this.loadRandom(CONFIG.body.image);
    this.head = this.loadRandom(CONFIG.head.image);
    this.rightArm = this.loadRandom(CONFIG.arms.image);
    this.dead = this.load(MonsterComponent.getPath(CONFIG.death.image, ''));
  }

  loadRandom(type) {
    return this.load(MonsterComponent.getRandomPath(type));
  }

  load(path) {
    const image = new Image();
    image.src = path;
    image.onload = () => this.onImageLoaded();
    return image;
  }

  onImageLoaded() {
    this.imagesLoadedCount += 1;
    if (this.imagesLoadedCount === CONFIG.numberOfParts) {
      this.draw();
    }
  }

  drawHead() {
    const heightPosition = document.body.offsetHeight * CONFIG.head.ratio.height
      - this.breath.current;
    const widthPosition = document.body.offsetWidth * CONFIG.head.ratio.width;
    this.ctx.drawImage(this.head, widthPosition, heightPosition);
  }

  drawBody() {
    const heightPosition = document.body.offsetHeight * CONFIG.body.ratio.height;
    const widthPosition = document.body.offsetWidth * CONFIG.body.ratio.width;
    this.ctx.drawImage(this.body, widthPosition, heightPosition);
  }

  drawLegs() {
    const heightPosition = document.body.offsetHeight * CONFIG.legs.ratio.height;
    const widthPosition = document.body.offsetWidth * CONFIG.legs.ratio.width;
    this.ctx.drawImage(this.legs, widthPosition, heightPosition);
  }

  drawLeftArm() {
    const armWidth = this.leftArm.width - CONFIG.arms.position.left.width;
    const heightPosition = document.body.offsetHeight * CONFIG.arms.ratio.left.height
      - this.breath.current;
    const widthPosition = document.body.offsetWidth * CONFIG.arms.ratio.left.width;
    this.ctx.translate(widthPosition + armWidth, heightPosition);
    this._rotateHand();
    this.ctx.drawImage(
      this.leftArm,
      CONFIG.arms.position.left.width, 0,
      armWidth, this.leftArm.height,
      -armWidth, 0,
      armWidth, this.leftArm.height,
    );
    this.ctx.restore();
  }

  _rotateHand() {
    this.ctx.rotate(this.handAngle * Math.PI / 180);
    if (this.weapon.attack && this.handAngle < this.cfg.arms.attack.angle) {
      this.handAngle += this.cfg.arms.attack.step;
    } else if (!this.weapon.attack && this.handAngle > 0) {
      this.handAngle -= this.cfg.arms.attack.step;
    }
  }

  drawRightArm() {
    const heightPosition = document.body.offsetHeight * CONFIG.arms.ratio.right.height
      - this.breath.current;
    const widthPosition = document.body.offsetWidth * CONFIG.arms.ratio.right.width;
    this.ctx.drawImage(
      this.rightArm,
      0, 0,
      CONFIG.arms.position.right.width, this.rightArm.height,
      widthPosition, heightPosition,
      CONFIG.arms.position.right.width, this.rightArm.height,
    );
  }

  static getPath(type, index) {
    return CONFIG.image.path + type + index + CONFIG.image.ext;
  }

  static getRandomPath(type) {
    return MonsterComponent.getPath(type, Utils.random(CONFIG.numberOfMonsters));
  }
}
