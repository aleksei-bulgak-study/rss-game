import Utils from '../../src/services/util';

describe('Utils', () => {
  describe('normilize text', () => {
    it('basic word without spaces', () => {
      expect(Utils.normalizeText('test')).toEqual('test');
    });

    it('word with spaces', () => {
      expect(Utils.normalizeText('   test   ')).toEqual('test');
    });

    it('word with spaces and upper case', () => {
      expect(Utils.normalizeText('   TEST   ')).toEqual('test');
    });

    it('null value', () => {
      expect(Utils.normalizeText(null)).toEqual('');
    });

    it('undefined value', () => {
      expect(Utils.normalizeText(undefined)).toEqual('');
    });
  });

  describe('random', () => {
    it('from 1 to 10', () => {
      for (let i = 0; i < 1000; i += 1) {
        const result = Utils.random(10, 1);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(10);
      }
    });

    it('from 0 to 10', () => {
      for (let i = 0; i < 1000; i += 1) {
        const result = Utils.random(10, 0);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(10);
      }
    });

    it('to 10 with default min value', () => {
      for (let i = 0; i < 1000; i += 1) {
        const result = Utils.random(10);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(10);
      }
    });

    it('without values', () => {
      for (let i = 0; i < 1000; i += 1) {
        const result = Utils.random();
        expect(result).toBe(0);
      }
    });
  });
});
