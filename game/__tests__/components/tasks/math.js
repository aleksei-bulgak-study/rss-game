import 'jest';
import '@babel/polyfill';
import MathTaskComponent from '../../../src/components/tasks/math';
import MathService from '../../../src/services/math';

describe('MathTaskComponent', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div class="container"></div>';
    jest.restoreAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('show', () => {
    it('render', () => {
      const math = new MathTaskComponent();
      math.show();

      expect(document.body.querySelector('div.modal>div.modal_content>div.task')).toBeDefined();
      expect(document.body.querySelector('div.modal>div.modal_content>div.task>p.task_title')).toBeDefined();
      expect(document.body.querySelector('p.task_title').innerHTML)
        .toEqual('Please enter only the integer part of the result number');
      expect(document.body.querySelector('div.modal>div.modal_content>div.task>p.task_description')).toBeDefined();
      expect(document.body.querySelector('div.modal>div.modal_content>div.task>input.task_input')).toBeDefined();
      expect(document.body.querySelector('div.modal>div.modal_content>div.task>button')).toBeDefined();
    });
  });

  describe('process', () => {
    it('press submit with valid value', async () => {
      // given
      const value = 123456;
      const isAnswerValidMock = jest.spyOn(MathService, 'isAnswerValid')
        .mockImplementationOnce(() => true);

      const math = new MathTaskComponent();
      math.show();
      const button = document.body.querySelector('.task_submit');
      const input = document.body.querySelector('.task_input');
      input.value = value;

      // when
      const result = math.process(button);
      button.click();
      const response = await (() => result)();
      expect(response).toEqual(true);
      // then
      expect(isAnswerValidMock.mock.calls[0][1]).toEqual(value);
      expect(isAnswerValidMock.mock.results[0].value).toBeTruthy();
      isAnswerValidMock.mockRestore();
    });

    it('press submit with invalid answer', async () => {
      // given
      const value = 456;
      const isAnswerValidMock = jest.spyOn(MathService, 'isAnswerValid')
        .mockImplementationOnce(() => false);

      const math = new MathTaskComponent();
      math.show();
      const button = document.body.querySelector('.task_submit');
      const input = document.body.querySelector('.task_input');
      input.value = value;

      // when
      const result = math.process(button);
      button.click();
      const response = await (() => result)();
      expect(response).toEqual(false);
      // then
      expect(isAnswerValidMock.mock.calls[0][1]).toEqual(value);
      expect(isAnswerValidMock.mock.results[0].value).toBeFalsy();
      isAnswerValidMock.mockRestore();
    });
  });
});
