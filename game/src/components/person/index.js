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
    super(name, CONFIG);
    this.ctx = canvasContext;
    this.name = name;
    this.weapon = this.initWeaponComponent();
    this.hp = CONFIG.hp.value;
    this.imagesLoadedCount = 0;
    this.breathInterval = 0;
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
      - CONFIG.breath.current;
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
      - CONFIG.breath.current;
    const widthPosition = document.body.offsetWidth * CONFIG.arms.ratio.left.width;
    const widthSize = this.leftArm.width / CONFIG.scaleRation;
    const heightSize = this.leftArm.height / CONFIG.scaleRation;
    this.ctx.drawImage(
      this.leftArm,
      widthPosition, heightPosition,
      widthSize, heightSize,
    );
  }

  drawRightArm() {
    const heightPosition = document.body.offsetHeight * CONFIG.arms.ratio.right.height
      - CONFIG.breath.current;
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
