import 'jest';
import RandomNameGenerator from '../../src/services/name';

describe('RandomNameGenerator', () => {
  describe('getRandomValue', () => {
    it('simple', () => {
      expect(RandomNameGenerator.getRandomValue([1])).toBe(1);
    });

    it('empty array', () => {
      expect(RandomNameGenerator.getRandomValue([])).toBe(undefined);
    });
  });

  describe('build', () => {
    it('simple', () => {
      expect(RandomNameGenerator.build()).toBe('first name last name middle name');
    });
  });
});
