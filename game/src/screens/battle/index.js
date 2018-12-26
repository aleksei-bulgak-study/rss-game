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
    this.init();
    this.initPerson(session);
    this.initMonster(session);
    return this.getFightResult();
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
          this.person.attack(() => { this.monster.health = CONFIG.damage; });
        } else {
          this.monster.attack(() => { this.person.health = CONFIG.damage; });
        }
      }).then(() => {
        if (this.monster.health === CONFIG.dead) {
          this.levelUp();
        }

        if (this.person.health) {
          return this.getFightResult();
        }
        // return current score or smth else cause user is dead
        return '42';
      });
  }
}
