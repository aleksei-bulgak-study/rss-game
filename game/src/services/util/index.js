const EMPTY_TEXT = '';

export default class Utils {
  static random(max = 0, min = 0) {
    return Math.floor(Math.random() * max) + min;
  }

  static normalizeText(word) {
    return word ? word.toLowerCase().trim() : EMPTY_TEXT;
  }

  static shuffle(array) {
    const tmpArray = [...array];
    for (let i = tmpArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [tmpArray[i], tmpArray[j]] = [tmpArray[j], tmpArray[i]];
    }
    return tmpArray;
  }
}
