import ModalWindowComponent from '../../modal';

export default class AbstractTaskComponent extends ModalWindowComponent {
  constructor() {
    super();
    if (!new.target) {
      throw Error('It is not allowed to create direct instance of  AbstractTaskComponent');
    }
  }

  async execute() {
    this.show();
    const result = await this.process();
    this.clean();
    return result;
  }
}
