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
    return new Promise((resolve) => {
      const task = MathService.getRandomTask();
      const input = this.modal.querySelector(CONST.task.input);
      this.modal.querySelector(CONST.task.description).innerHTML = task;
      this.modal.querySelector(CONST.task.submit).addEventListener('click', () => {
        const answer = parseInt(input.value, 10);
        if (MathService.isAnswerValid(task, answer)) {
          resolve(true);
        }
        resolve(false);
      });
    });
  }
}
