import template from './index.template.html';
import loading from './tmp.template.html';
import './index.css';

import ScoreService from '../../services/score';
import MongoScoreService from '../../services/mongo';

const CONSTANTS = {
  element: 'div.container',
  scoreContainer: 'div.score-container table>tbody',
  retryAction: 'start',
};

export default class ScoreBoard {
  constructor() {
    this.storage = new MongoScoreService();
    this.oldStorage = new ScoreService();
  }

  storeResult(results) {
    return this.storage.store(results);
  }

  async show() {
    document.body.querySelector(CONSTANTS.element).innerHTML = loading;
    const scores = await this.storage.load();
    document.body.querySelector(CONSTANTS.element).innerHTML = template;
    await this._drawScores(scores);
    return this._initEventListeners();
  }

  hide() {
    document.body.querySelector(CONSTANTS.element).innerHTML = null;
  }

  _initEventListeners() {
    return new Promise((resolve) => {
      const button = document.body.querySelector('button');
      button.focus();
      button.addEventListener('click', () => resolve(CONSTANTS.retryAction));
    });
  }

  async _drawScores(scores) {
    const fragment = document.createDocumentFragment();
    scores.sort((f, s) => s.level - f.level)
      .slice(0, 10)
      .forEach((score) => {
        const element = this._createElementWithClass('tr');
        const name = this._createElementWithClass('td');
        name.innerHTML = score.name;

        const level = this._createElementWithClass('td');
        level.innerHTML = score.level;

        element.append(name, level);
        fragment.append(element);
      });
    document.body.querySelector(CONSTANTS.scoreContainer).append(fragment);
  }

  _createElementWithClass(tagName, ...classList) {
    const element = document.createElement(tagName);
    classList.forEach(classToAdd => element.classList.append(classToAdd));
    return element;
  }
}
