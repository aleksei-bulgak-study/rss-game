import './index.css';
import template from './index.template.html';

const CONST = {
  modalWindowContainer: 'div',
  contentElement: '.modal_content',
};

export default class ModalWindowComponent {
  show() {
    this.container = document.createElement(CONST.modalWindowContainer);
    this.container.innerHTML = template;
    document.body.appendChild(this.container);
    this.modal = this.container.querySelector(CONST.contentElement);
  }

  clean() {
    this.container.remove();
  }
}
