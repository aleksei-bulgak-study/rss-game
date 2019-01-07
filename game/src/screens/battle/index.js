import template from './index.template.html';
import './index.css';

import PersonComponent from '../../components/person';
import MonsterComponent from '../../components/monster';
import TaskChooserComponent from '../../components/taskChooser';
import LevelInfoComponent from '../../components/level';

import RandomNameGenerator from '../../services/name';

const CONFIG = {
  element: 'div.container',
  canvas: 'canvas',
  damage: 10,
  dead: 0,
  initialLevel: 0,
  nextLevel: 1,
  banner: {
    text: 'Please wait. Loading components.',
    style: '2em serif',
  },
};

export default class Battle {
  static initTemplate() {
    document.body.querySelector(CONFIG.element).innerHTML = template;
    const canvas = document.body.querySelector(CONFIG.canvas);
    canvas.setAttribute('width', document.body.offsetWidth);
    canvas.setAttribute('height', document.body.offsetHeight);
  }

  async start(session) {
    this.session = session;
    this.session.level = CONFIG.initialLevel;
    this.loaded = false;
    this.init();
    await Promise.all([this.initPerson(), this.initMonster()]);
    this.initLevelInfo();
    this.loaded = true;
    return this.getFightResult();
  }

  init() {
    Battle.initTemplate();
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.taskChooser = new TaskChooserComponent();
    this.refreshScreen();
  }

  refreshScreen() {
    this.canvas.width = this.canvas.width;
    if (this.frameId) {
      window.cancelAnimationFrame(this.frameId);
    }

    if (!this.loaded) {
      this._drawBanner();
    }

    this.frameId = window.requestAnimationFrame(() => this.refreshScreen());
  }

  async nextLevel() {
    await this.monster.death();
    this.session.level += CONFIG.nextLevel;
    await this.initMonster(this.session);
  }

  initPerson() {
    this.person = new PersonComponent(this.ctx, this.session.nickName);
    return this.person.build();
  }

  initMonster() {
    this.monster = new MonsterComponent(this.ctx, RandomNameGenerator.build());
    return this.monster.build();
  }

  initLevelInfo() {
    this.levelInfo = new LevelInfoComponent(this.ctx, this.session).draw();
  }

  async getFightResult() {
    return this.taskChooser.choseComponent()
      .then(task => task.execute())
      .then((isCorrectAnswer) => {
        if (isCorrectAnswer) {
          return this.person.attack(() => { this.monster.health = CONFIG.damage; });
        }
        return this.monster.attack(() => { this.person.health = CONFIG.damage; });
      }).then(async () => {
        if (this.monster.health === CONFIG.dead) {
          await this.nextLevel();
        }

        if (this.person.health === CONFIG.dead) {
          return this._buildResult();
        }

        return this.getFightResult();
      });
  }

  _buildResult() {
    return this.session;
  }

  _drawBanner() {
    this.ctx.save();
    this.ctx.font = CONFIG.banner.style;

    const heightPosition = this.canvas.height / 2;
    const widthPosition = this.canvas.width / 2;
    const textWidth = this.ctx.measureText(CONFIG.banner.text).width;

    this.ctx.fillText(CONFIG.banner.text, (widthPosition) - (textWidth / 2), heightPosition);
    this.ctx.restore();
  }
}
