import 'jest';
import ScoreService from '../../src/services/score';

const scoreService = new ScoreService();
const localStorageName = 'rss-game-score-storage';

describe('ScoreService', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('store', () => {
    it('simple', () => {
      // given
      const scoreMock = jest.spyOn(scoreService, 'load').mockImplementationOnce(() => []);
      const storageMock = jest.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => 'mock result');

      // when
      const data = { nickName: 'test', level: '0' };
      scoreService.store(data);

      // then
      const expected = { name: 'test', level: '0' };
      expect(scoreMock.mock.results[0].isThrow).toBe(false);
      expect(storageMock.mock.calls[0][1]).toBe(JSON.stringify([expected]));

      scoreMock.mockRestore();
      storageMock.mockRestore();
    });

    it('empty result', () => {
      // given
      const scoreMock = jest.spyOn(scoreService, 'load').mockImplementationOnce(() => []);
      const storageMock = jest.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => 'mock result');

      // when
      scoreService.store(undefined);

      // then
      expect(scoreMock.mock.results.length).toBe(0);
      expect(storageMock.mock.results.length).toBe(0);

      scoreMock.mockRestore();
      storageMock.mockRestore();
    });
  });

  describe('load', () => {
    it('when storage is empty', () => {
      // given
      const storageMock = jest.spyOn(Storage.prototype, 'getItem').mockImplementationOnce(() => undefined);
      const scoreMock = jest.spyOn(scoreService, '_save').mockImplementationOnce(() => 'mock response');

      // when
      const results = scoreService.load();

      // then
      expect(results).toEqual('mock response');
      expect(scoreMock.mock.calls[0][0]).toEqual([]);
      expect(storageMock.mock.calls[0][0]).toEqual(localStorageName);

      storageMock.mockRestore();
      scoreMock.mockRestore();
    });

    it('when storage contains data', () => {
      // given
      const data = [{ name: 'mock', label: 0 }];
      const storageMock = jest.spyOn(Storage.prototype, 'getItem')
        .mockImplementationOnce(() => JSON.stringify(data));
      const scoreMock = jest.spyOn(scoreService, '_save').mockImplementationOnce(() => 'mock response');

      // when
      const results = scoreService.load();

      // then
      expect(results).toEqual(data);
      expect(scoreMock.mock.calls.length).toBe(0);
      expect(storageMock.mock.calls[0][0]).toEqual(localStorageName);

      storageMock.mockRestore();
      scoreMock.mockRestore();
    });
  });
});
