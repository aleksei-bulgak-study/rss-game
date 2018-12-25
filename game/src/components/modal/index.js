import './index.css';
import template from './index.template.html';

const CONFIG = {
  element: '.modal',
};

export default class ModalWindow {
  constructor(childComponent) {
    this.childComponent = childComponent;
    this.draw(childComponent);
  }

  draw() {
    this.container = document.createElement('div');
    this.container.innerHTML = template;
    document.body.appendChild(this.container);
    document.body.querySelector(CONFIG.element).appendChild(this.childComponent);
  }

  clean() {
    this.container.remove();
  }
}
