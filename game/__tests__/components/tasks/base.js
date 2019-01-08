import 'jest';
import '@babel/polyfill';
import AbstractTaskComponent from '../../../src/components/tasks/base';

describe('AbstractTaskComponent', () => {
  it('direct constructor call result in exception', () => {
    expect(() => new AbstractTaskComponent()).toThrow(Error);
  });
});
