import template from './index.template.html';
import './index.css';

const CONSTANTS = {
  element: 'div.container',
  input: 'input#nickname',
  error: 'label.error',
  errorMessage: 'Nickname can not be null or empty',
  enterKey: 13,
};

export default class Login {
  static show() {
    document.body.querySelector(CONSTANTS.element).innerHTML = template;
    return this.processLogin();
  }

  static hide() {
    document.body.querySelector(CONSTANTS.element).innerHTML = '';
  }

  static processLogin() {
    return Login.onPlay().catch(() => {
      document.body.querySelector(CONSTANTS.error).innerHTML = CONSTANTS.errorMessage;
      return this.processLogin();
    });
  }

  static onPlay() {
    const input = document.body.querySelector(CONSTANTS.input);
    input.focus();
    return new Promise((resolve, reject) => {
      const button = document.body.querySelector('button');
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const nickName = input.value;
        if (nickName) {
          resolve(nickName);
        }
        reject();
      });
      button.addEventListener('keyup', (event) => {
        if (event.keyCode === CONSTANTS.enterKey) {
          button.click();
        }
      });
    });
  }
}
