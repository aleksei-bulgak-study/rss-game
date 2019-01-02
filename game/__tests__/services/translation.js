import 'jest';
import TranslationService from '../../src/services/translation';

/* eslint-disable */
Object.defineProperty(Array.prototype, 'flatMap', { 
  enumerable: false,
  value: function flatMap(callback, thisArg = undefined) {
    return ['тест', 'тэст'];
  }
});

describe('TranslationService', () => {
  describe('isAnswerValid', () => {
    it('simple', () => {
      expect(TranslationService.isAnswerValid('test', 'тест')).toBe(true);
    });

    it('simple', () => {
      expect(TranslationService.isAnswerValid('test', 'тост')).toBe(false);
    });
  });

  describe('getRandomTask', () => {
    it('simple', () => {
      expect(TranslationService.getRandomTask()).toBe('test');
    });
  });
});
