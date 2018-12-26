import template from './index.template.html';
import './index.css';

import AbstractTask from '../base';
import MathService from '../../../services/math';

const CONST = {
  task: {
    description: '.task_description',
    input: '.task_input',
    submit: '.task_submit',
  },
};

export default class MathTaskComponent extends AbstractTask {
  show() {
    super.show();
    this.modal.innerHTML = template;
  }

  process() {
    return new Promise((resoleve) => {
      const taskInfo = MathService.buildRandomTask();
      const input = this.modal.querySelector(CONST.task.input);
      this.modal.querySelector(CONST.task.description).innerHTML = taskInfo.task;
      this.modal.querySelector(CONST.task.submit).addEventListener('click', () => {
        const answer = parseInt(input.value, 10);
        if (answer === taskInfo.answer) {
          resoleve(true);
        }
        resoleve(false);
      });
    });
  }
}
