import template from './index.template.html';
import './index.css';

import ScoreService from '../../services/score';

const CONSTANTS = {
  element: 'div.container',
  scoreContainer: 'div.score-container table>tbody',
  retryAction: 'start',
};

export default class ScoreBoard {
  constructor() {
    this.storage = new ScoreService();
  }

  storeResult(results) {
    this.storage.store(results);
  }

  show() {
    document.body.querySelector(CONSTANTS.element).innerHTML = template;
    this._drawScores();
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

  _drawScores() {
    const fragment = document.createDocumentFragment();
    this.storage.load()
      .sort((f, s) => s.level - f.level)
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
