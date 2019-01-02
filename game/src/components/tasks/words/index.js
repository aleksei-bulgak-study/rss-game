import './index.css';
import template from './index.template.html';

export default class WordTaskComponent {
  show() {
    super.show();
    this.modal.innerHTML = template;
  }

  process() {
    return new Promise((resoleve) => {
    });
  }
}
