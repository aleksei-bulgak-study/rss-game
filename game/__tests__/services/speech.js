import 'jest';
import SpeechService from '../../src/services/speech';

describe('SpeechService', () => {
  describe('getRandomTask', () => {
    it('success', () => {
      const response = SpeechService.getRandomTask();
      expect(response).toBe('mock');
    });
  });

  describe('isAnswerValid', () => {
    it('simple', () => {
      expect(SpeechService.isAnswerValid('mock', '  mock  ')).toBe(true);
      expect(SpeechService.isAnswerValid('mock', 'mock  ')).toBe(true);
      expect(SpeechService.isAnswerValid('mock', '  mock')).toBe(true);
      expect(SpeechService.isAnswerValid('mock', 'mock')).toBe(true);
      expect(SpeechService.isAnswerValid('mock', 'invalid')).toBe(false);
      expect(SpeechService.isAnswerValid('mock', 'invalid   ')).toBe(false);
      expect(SpeechService.isAnswerValid('mock', '   invalid   ')).toBe(false);
      expect(SpeechService.isAnswerValid('mock', '   invalid')).toBe(false);
    });
  });
});
