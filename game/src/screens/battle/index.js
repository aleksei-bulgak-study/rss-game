import template from './index.template.html';
import './index.css';

import PersonComponent from '../../components/person';
import MonsterComponent from '../../components/monster';

const CONSTANTS = {
  element: 'div.container',
  canvas: 'canvas',
};

export default class Battle {
  static initTemplate() {
    document.body.querySelector(CONSTANTS.element).innerHTML = template;
    const canvas = document.body.querySelector(CONSTANTS.canvas);
    canvas.setAttribute('width', document.body.offsetWidth);
    canvas.setAttribute('height', document.body.offsetHeight);
  }

  init() {
    Battle.initTemplate();
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.refreshScreen();
  }

  start(session) {
    this.init();
    this.initPerson();
    this.initMonster();
  }

  initPerson() {
    this.person = new PersonComponent(this.ctx);
  }

  initMonster() {
    this.monster = new MonsterComponent(this.ctx);
  }

  refreshScreen() {
    this.canvas.width = this.canvas.width;
    window.requestAnimationFrame(() => this.refreshScreen());
  }
}
