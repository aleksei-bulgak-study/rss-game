import template from './index.template.html';
import './index.css';

import PersonComponent from '../../components/person';
import MonsterComponent from '../../components/monster';
import TaskChooserComponent from '../../components/taskChooser';

import RandomNameGenerator from '../../services/name';

const CONFIG = {
  element: 'div.container',
  canvas: 'canvas',
  damage: 50,
  dead: 0,
};

export default class Battle {
  static initTemplate() {
    document.body.querySelector(CONFIG.element).innerHTML = template;
    const canvas = document.body.querySelector(CONFIG.canvas);
    canvas.setAttribute('width', document.body.offsetWidth);
    canvas.setAttribute('height', document.body.offsetHeight);
  }

  init() {
    Battle.initTemplate();
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.taskChooser = new TaskChooserComponent();
    this.refreshScreen();
  }

  async start(session) {
    this.session = session;
    this.init();
    this.initPerson(session);
    this.initMonster(session);
    return this.getFightResult();
  }

  async nextLevel() {
    await this.monster.death();
    this.initMonster(this.session);
  }

  initPerson(session) {
    this.person = new PersonComponent(this.ctx, session.nickName);
  }

  initMonster() {
    this.monster = new MonsterComponent(this.ctx, RandomNameGenerator.build());
  }

  refreshScreen() {
    this.canvas.width = this.canvas.width;
    window.requestAnimationFrame(() => this.refreshScreen());
  }

  async getFightResult() {
    return this.taskChooser.choseComponent()
      .then(task => task.execute())
      .then((isCorrectAnswer) => {
        if (isCorrectAnswer) {
          return this.person.attack(() => { this.monster.health = CONFIG.damage; });
        }
        return this.monster.attack(() => { this.person.health = CONFIG.damage; });
      }).then(() => {
        if (this.monster.health === CONFIG.dead) {
          this.nextLevel();
        }

        if (this.person.health === CONFIG.dead) {
          return this._buildResult();
        }

        return this.getFightResult();
      });
  }

  _buildResult() {
    return '42';
  }
}
