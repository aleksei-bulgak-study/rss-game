import template from './index.template.html';
import './index.css';

const CONSTANTS = {
  element: 'div.container',
  input: 'input#nickname',
  error: 'label.error',
  errorMessage: 'Nickname can not be null or empty',
};

export default class Login {
  static show() {
    document.body.querySelector(CONSTANTS.element).innerHTML = template;
    Login.onPlay().catch(() => {
      document.body.querySelector(CONSTANTS.error).innerHTML = CONSTANTS.errorMessage;
    });
  }

  static hide() {
    document.body.querySelector(CONSTANTS.element).innerHTML = '';
  }

  static onPlay() {
    return new Promise((resolve, reject) => {
      document.body.querySelector('button').addEventListener('click', (e) => {
        e.preventDefault();
        const nickName = document.body.querySelector(CONSTANTS.input).value;
        if (nickName) {
          resolve(nickName);
        }
        reject();
      });
    });
  }
}
