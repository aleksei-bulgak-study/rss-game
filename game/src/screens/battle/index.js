import template from './index.template.html';
import './index.css';

import PersonComponent from '../../components/person';
import MonsterComponent from '../../components/monster';
import ModalComponent from '../../components/modal';

import RandomNameGenerator from '../../services/name';

const CONFIG = {
  element: 'div.container',
  canvas: 'canvas',
  damage: 50,
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
    this.refreshScreen();
  }

  start(session) {
    this.init();
    this.initPerson(session);
    this.initMonster();

    this.person.attack(() => { this.monster.health = CONFIG.damage; });

    let modal = new ModalComponent("TEST MODAL!!");
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
}
