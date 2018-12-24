const CONFIG = {
  breath: {
    min: -1, max: 3, interval: 5, current: 0, step: 0.1,
  },
  scaleRation: 6,
  numberOfParts: 5,
  image: { path: './images/person/', ext: '.png' },
  head: {
    image: 'head',
    ratio: { height: 0.77, width: 0.29 },
  },
  body: {
    image: 'body',
    ratio: { height: 0.84, width: 0.295 },
  },
  legs: {
    image: 'legs',
    ratio: { height: 0.92, width: 0.3 },
  },
  arms: {
    image: { left: 'arm_left', right: 'arm_right' },
    ratio: {
      left: { height: 0.85, width: 0.32 },
      right: { height: 0.85, width: 0.29 },
    },
    position: {
      left: { height: 0, width: 90 },
      right: { height: 0, width: 85 },
    },
  },
};

export default class PersonComponent {
  constructor(canvasContext) {
    this.ctx = canvasContext;
    this.imagesLoadedCount = 0;
    this.breathInterval = 0;
    this.build();
  }

  build() {
    this.legs = this.load(CONFIG.legs.image);
    this.leftArm = this.load(CONFIG.arms.image.left);
    this.body = this.load(CONFIG.body.image);
    this.head = this.load(CONFIG.head.image);
    this.rightArm = this.load(CONFIG.arms.image.right);
  }

  load(type) {
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

  draw() {
    this.recalculateBreath();
    this.drawLegs();
    this.drawLeftArm();
    this.drawBody();
    this.drawRightArm();
    this.drawHead();
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
