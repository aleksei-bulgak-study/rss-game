import template from './index.template.html';
import './index.css';

import AbstractTaskComponent from '../base';
import SpeechService from '../../../services/speech';

const CONST = {
  task: {
    input: '.task_input',
    submit: '.task_submit',
    play: '.task_play',
  },
};

export default class AuditionTaskComponent extends AbstractTaskComponent {
  show() {
    super.show();
    this.modal.innerHTML = template;
  }

  process() {
    return new Promise((resolve) => {
      const task = SpeechService.getRandomTask();
      const input = this.modal.querySelector(CONST.task.input);
      this.modal.querySelector(CONST.task.submit).addEventListener('click', () => {
        if (SpeechService.isAnswerValid(task, input.value)) {
          resolve(true);
        }
        resolve(false);
      });
      this.modal.querySelector(CONST.task.play).addEventListener('click',
        async () => SpeechService.pronounce(task));
    });
  }
}
