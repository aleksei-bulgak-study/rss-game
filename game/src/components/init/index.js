import './index.css';
import template from './index.template.html';

export default class Init {
  static init() {
    document.body.innerHTML = template;
  }
}
