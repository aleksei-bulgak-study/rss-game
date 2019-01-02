import config from './files/config.json';
import Utils from '../util';

export default class TranslationService {
  static getRandomTask() {
    const taskIndex = Utils.random(config.dictionary.length);
    return config.dictionary[taskIndex].word;
  }

  static isAnswerValid(task, answer) {
    const expected = Utils.normalizeText(answer);
    return config.dictionary
      .filter(e => e.word === task)
      .flatMap(e => e.translations)
      .some(t => t === expected);
  }
}
