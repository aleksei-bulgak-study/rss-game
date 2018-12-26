import config from './files/configs.json';
import Utils from '../util';

export default class MathService {
  static buildRandomTask() {
    const firstOperand = MathService.getOperand();
    const secondOperand = MathService.getOperand();
    const operation = config.operators[Utils.random(config.operators.length - 1)];
    return {
      task: `${firstOperand} ${operation} ${secondOperand}`,
      answer: Math.floor(eval(`${firstOperand} ${operation} ${secondOperand}`)),
    };
  }

  static getOperand() {
    return Utils.random(config.values.max, config.values.min);
  }
}
