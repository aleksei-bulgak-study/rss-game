const EMPTY_TEXT = '';

export default class Utils {
  static random(max = 0, min = 0) {
    return Math.floor(Math.random() * max) + min;
  }

  static normalizeText(word) {
    return word ? word.toLowerCase().trim() : EMPTY_TEXT;
  }
}
