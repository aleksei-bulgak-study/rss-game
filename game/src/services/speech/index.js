import config from './files/config.json';
import Utils from '../util';

export default class SpeechService {
  static getRandomTask() {
    const taskIndex = Utils.random(config.words.length);
    return config.words[taskIndex];
  }

  static isAnswerValid(task, answer) {
    const expected = Utils.normalizeText(answer);
    return task === expected
      && config.words.some(word => word === task);
  }

  static pronounce(word) {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(Utils.normalizeText(word));
      utterance.onend = () => resolve();
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    });
  }
}
