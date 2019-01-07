import './index.css';
import template from './index.template.html';

const CONFIG = {
  key: {
    left: 37,
    right: 39,
    up: 38,
    down: 40,
  },
  direction: {
    next: 1,
    prev: -1,
  },
  navigation: {
    selector: '.navigable',
    class: 'navigable',
  },
};

export default class Init {
  static init() {
    document.body.innerHTML = template;
    document.body.addEventListener('keydown', Init._navegation);
  }

  static _navegation(event) {
    const key = event.keyCode;
    if (key === CONFIG.key.left || key === CONFIG.key.up) {
      event.preventDefault();
      Init.focusOnElement(CONFIG.direction.prev);
    } else if (key === CONFIG.key.right || key === CONFIG.key.down) {
      event.preventDefault();
      Init.focusOnElement(CONFIG.direction.next);
    }
  }

  static focusOnElement(direction) {
    const navigables = document.body.querySelectorAll(CONFIG.navigation.selector);
    const focused = document.activeElement;
    if (focused && navigables.length > 0) {
      if (focused.classList.contains(CONFIG.navigation.class)) {
        let index = Array.prototype.indexOf.call(navigables, focused);
        index = index === -1 ? 0 : index + direction;
        index = index < 0 ? navigables.length - 1 : index;
        index = index >= navigables.length ? 0 : index;
        navigables[index].focus();
      } else {
        navigables[0].focus();
      }
    }
  }
}
