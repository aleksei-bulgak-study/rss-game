import config from './files/config.json';
import Utils from '../util';

export default class MathService {
  static getRandomTask() {
    const firstOperand = MathService.getOperand();
    const secondOperand = MathService.getOperand();
    const operation = config.operators[Utils.random(config.operators.length - 1)];
    return `${firstOperand} ${operation} ${secondOperand}`;
  }

  static isAnswerValid(task, answer) {
    return Math.floor(eval(task)) === answer;
  }

  static getOperand() {
    return Utils.random(config.values.max, config.values.min);
  }
}
