import config from './files/config.json';
import Utils from '../util';

export default class TranslationService {
  static getRandomTask() {
    const taskIndex = Utils.random(config.length);
    return config[taskIndex].word;
  }

  static isAnswerValid(task, answer) {
    const expected = Utils.normalizeText(answer);
    return config
      .filter(e => e.word === task)
      .flatMap(e => e.translations)
      .some(t => t === expected);
  }
}
