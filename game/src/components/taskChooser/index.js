import template from './index.template.html';
import './index.css';

import ModalWindowComponent from '../modal';
import MathTaskComponent from '../tasks/math';
import TranlsationTaskComponent from '../tasks/translate';
import AuditionTaskComponent from '../tasks/audition';

const CONST = {
  taskSelector: '.task-container_element',
  taskNameAttribute: 'id',
};

export default class TaskChooserComponent extends ModalWindowComponent {
  constructor() {
    super();
    this.tasks = this.initTasks();
  }

  initTasks() {
    return {
      math: MathTaskComponent,
      translation: TranlsationTaskComponent,
      audition: AuditionTaskComponent,
    };
  }

  async choseComponent() {
    super.show();
    this.modal.innerHTML = template;
    return this.initActions();
  }

  initActions() {
    return new Promise((resolve) => {
      this.modal.addEventListener('click', (event) => {
        const taskName = event.target.closest(CONST.taskSelector)
          .getAttribute(CONST.taskNameAttribute);
        const task = this.getInstanceOfTask(taskName);
        if (task) {
          this.clean();
          resolve(task);
        }
      });
    });
  }

  getInstanceOfTask(taskName) {
    let task = this.tasks[taskName];
    if (!task) {
      [task] = this.tasks;
    }
    return Object.create(task.prototype);
  }
}
