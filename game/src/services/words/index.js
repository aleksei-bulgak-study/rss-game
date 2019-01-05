import config from './files/config.json';
import Utils from '../util';

export default class WordService {
  static getRandomTask() {
    const word = config.words[Utils.random(config.words.length - 1)];
    const letterArray = word.trim().split('');
    return Utils.shuffle(letterArray);
  }

  static isAnswerValid(answer) {
    return config.words.indexOf(Utils.normalizeText(answer)) !== -1;
  }
}
