import template from './index.template.html';
import './index.css';

import AbstractTaskComponent from '../base';
import TranslationService from '../../../services/translation';

const CONST = {
  task: {
    description: '.task_description',
    input: '.task_input',
    submit: '.task_submit',
  },
};

export default class TranlsationTaskComponent extends AbstractTaskComponent {
  show() {
    super.show();
    this.modal.innerHTML = template;
  }

  process() {
    return new Promise((resolve) => {
      const task = TranslationService.getRandomTask();
      const input = this.modal.querySelector(CONST.task.input);
      this.modal.querySelector(CONST.task.description).innerHTML = task;
      this.modal.querySelector(CONST.task.submit).addEventListener('click', () => {
        if (TranslationService.isAnswerValid(task, input.value)) {
          resolve(true);
        }
        resolve(false);
      });
    });
  }
}
