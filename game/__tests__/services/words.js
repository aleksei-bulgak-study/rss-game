import 'jest';
import WordService from '../../src/services/words';
import Utils from '../../src/services/util';

describe('WordService', () => {
  describe('getRandomTask', () => {
    it('simple', () => {
      // given
      const shuffleResponse = 'mock value';
      const randomMock = jest.spyOn(Utils, 'random').mockImplementationOnce(() => 0);
      const shuffleMock = jest.spyOn(Utils, 'shuffle').mockImplementationOnce(() => shuffleResponse);

      // when
      const response = WordService.getRandomTask();

      // then
      expect(response).toBe('mock value');
      expect(randomMock.mock.calls[0][0]).toBe(0);
      expect(randomMock.mock.results[0].value).toBe(0);
      expect(shuffleMock.mock.calls[0][0]).toEqual(['m', 'o', 'c', 'k']);
      expect(shuffleMock.mock.results[0].value).toBe(shuffleResponse);

      randomMock.mockRestore();
      shuffleMock.mockRestore();
    });
  });

  describe('isAnswerValid', () => {
    it('valid', () => {
      // given
      const answer = 'mock';
      // when
      const result = WordService.isAnswerValid(answer);
      // then
      expect(result).toBe(true);
    });

    it('valid with spaces', () => {
      // given
      const answer = '  mock  ';
      // when
      const result = WordService.isAnswerValid(answer);
      // then
      expect(result).toBe(true);
    });

    it('invalid', () => {
      // given
      const answer = 'invalid';
      // when
      const result = WordService.isAnswerValid(answer);
      // then
      expect(result).toBe(false);
    });

    it('invalid with spaces', () => {
      // given
      const answer = '  invalid  ';
      // when
      const result = WordService.isAnswerValid(answer);
      // then
      expect(result).toBe(false);
    });
  });
});
