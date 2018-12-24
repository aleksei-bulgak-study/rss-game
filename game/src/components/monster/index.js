import Utils from '../../services/util';

const CONFIG = {
  breath: {
    min: -1, max: 5, interval: 2, current: 0, step: 0.1,
  },
  numberOfMonsters: 5,
  numberOfParts: 5,
  image: { path: './images/monster/', ext: '.png' },
  head: {
    image: 'head_',
    ratio: { height: 0.72, width: 0.7 },
  },
  body: {
    image: 'body_',
    ratio: { height: 0.74, width: 0.7 },
  },
  legs: {
    image: 'legs_',
    ratio: { height: 0.9, width: 0.715 },
  },
  arms: {
    image: 'arms_',
    ratio: {
      left: { height: 0.77, width: 0.62 },
      right: { height: 0.77, width: 0.75 },
    },
    position: {
      left: { height: 0, width: 90 },
      right: { height: 0, width: 85 },
    },
  },
};

export default class MonsterComponent {
  constructor(canvasContext) {
    this.ctx = canvasContext;
    this.imagesLoadedCount = 0;
    this.breathInterval = 0;
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

  draw() {
    this.recalculateBreath();
    this.drawLegs();
    this.drawLeftArm();
    this.drawBody();
    this.drawHead();
    this.drawRightArm();
    requestAnimationFrame(this.draw.bind(this));
  }

  recalculateBreath() {
    if (this.breathInterval === CONFIG.breath.interval) {
      this.breathInterval = 0;
      CONFIG.breath.current += CONFIG.breath.step;
      if (CONFIG.breath.current > CONFIG.breath.max || CONFIG.breath.current < CONFIG.breath.min) {
        CONFIG.breath.step = -CONFIG.breath.step;
      }
    }
    this.breathInterval += 1;
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
