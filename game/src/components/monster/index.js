import Utils from '../../services/util';
import CONFIG from './files/config.json';

import AbstractCharacter from '../character';

export default class MonsterComponent extends AbstractCharacter {
  constructor(canvasContext, name) {
    super(name, CONFIG);
    this.ctx = canvasContext;
    this.name = name;
    this.imagesLoadedCount = 0;
    this.breathInterval = 0;
    this.hp = 100;
    this.build();
  }

  build() {
    this.legs = this.load(CONFIG.legs.image);
    this.leftArm = this.load(CONFIG.arms.image);
    this.body = this.load(CONFIG.body.image);
    this.head = this.load(CONFIG.head.image);
    this.rightArm = this.load(CONFIG.arms.image);
  }

  load(type) {
    const image = new Image();
    image.src = MonsterComponent.getPath(type);
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
      - CONFIG.breath.current;
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
    const heightPosition = document.body.offsetHeight * CONFIG.arms.ratio.left.height
      - CONFIG.breath.current;
    const widthPosition = document.body.offsetWidth * CONFIG.arms.ratio.left.width;
    this.ctx.drawImage(
      this.leftArm,
      CONFIG.arms.position.left.width, 0,
      this.leftArm.width - CONFIG.arms.position.left.width, this.leftArm.height,
      widthPosition, heightPosition,
      this.leftArm.width - CONFIG.arms.position.left.width, this.leftArm.height,
    );
  }

  drawRightArm() {
    const heightPosition = document.body.offsetHeight * CONFIG.arms.ratio.right.height
      - CONFIG.breath.current;
    const widthPosition = document.body.offsetWidth * CONFIG.arms.ratio.right.width;
    this.ctx.drawImage(
      this.rightArm,
      0, 0,
      CONFIG.arms.position.right.width, this.rightArm.height,
      widthPosition, heightPosition,
      CONFIG.arms.position.right.width, this.rightArm.height,
    );
  }

  static getPath(type) {
    return CONFIG.image.path + type + Utils.random(CONFIG.numberOfMonsters) + CONFIG.image.ext;
  }
}
