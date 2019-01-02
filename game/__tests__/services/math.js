import 'jest';
import MathService from '../../src/services/math';

describe('Math', () => {
  describe('isAnswerValid', () => {
    it('simple', () => {
      expect(MathService.isAnswerValid(5, 5)).toBe(true);
    });

    it('complex number', () => {
      expect(MathService.isAnswerValid(5.005, 5)).toBe(true);
    });

    it('complex number when answer is false', () => {
      expect(MathService.isAnswerValid(6, 5)).toBe(false);
    });

    it('complex number when answer is false', () => {
      expect(MathService.isAnswerValid(6.1, 5)).toBe(false);
    });
  });

  describe('getOperand', () => {
    it('simple', () => {
      expect(MathService.getOperand()).toBe(1);
    });
  });

  describe('getRandomTask', () => {
    expect(MathService.getRandomTask()).toBe('1 + 1');
  });
});
