import template from './index.template.html';
import './index.css';

const CONSTANTS = {
  element: 'div.container',
};

export default class Home {
  static show() {
    document.body.querySelector(CONSTANTS.element).innerHTML = template;
    document.body.querySelector('button.play').focus();
    return Home.onPlay();
  }

  static hide() {
    document.body.querySelector(CONSTANTS.element).innerHTML = '';
  }

  static onPlay() {
    return new Promise((resolve) => {
      document.body.querySelector('button.play').addEventListener('click', () => {
        Home.hide();
        resolve('start');
      });
      document.body.querySelector('button.score').addEventListener('click', () => {
        Home.hide();
        resolve('score');
      });
    });
  }
}
