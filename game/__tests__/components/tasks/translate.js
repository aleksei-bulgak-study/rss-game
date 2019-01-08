import 'jest';
import '@babel/polyfill';
import TranlsationTaskComponent from '../../../src/components/tasks/translate';
import TranslationService from '../../../src/services/translation';

describe('TranlsationTaskComponent', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div class="container"></div>';
    jest.restoreAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('show', () => {
    it('render', () => {
      const translation = new TranlsationTaskComponent();
      translation.show();

      expect(document.body.querySelector('div.modal>div.modal_content>div.task')).toBeDefined();
      expect(document.body.querySelector('div.modal>div.modal_content>div.task>p.task_title')).toBeDefined();
      expect(document.body.querySelector('p.task_title').innerHTML)
        .toEqual('Please enter translation of work specified below');
      expect(document.body.querySelector('div.modal>div.modal_content>div.task>p.task_description')).toBeDefined();
      expect(document.body.querySelector('div.modal>div.modal_content>div.task>input.task_input')).toBeDefined();
      expect(document.body.querySelector('div.modal>div.modal_content>div.task>button')).toBeDefined();
    });
  });

  describe('process', () => {
    it('press submit with valid value', async () => {
      // given
      const value = 'test valid translation';
      const isAnswerValidMock = jest.spyOn(TranslationService, 'isAnswerValid')
        .mockImplementationOnce(() => true);

      const translation = new TranlsationTaskComponent();
      translation.show();
      const button = document.body.querySelector('.task_submit');
      const input = document.body.querySelector('.task_input');
      input.value = value;

      // when
      const result = translation.process(button);
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
      const value = 'test invalid value';
      const isAnswerValidMock = jest.spyOn(TranslationService, 'isAnswerValid')
        .mockImplementationOnce(() => false);

      const translation = new TranlsationTaskComponent();
      translation.show();
      const button = document.body.querySelector('.task_submit');
      const input = document.body.querySelector('.task_input');
      input.value = value;

      // when
      const result = translation.process(button);
      button.click();
      const response = await (() => result)();
      expect(response).toEqual(false);
      // then
      expect(isAnswerValidMock.mock.calls[0][1]).toEqual(value);
      expect(isAnswerValidMock.mock.results[0].value).toBeFalsy();
      isAnswerValidMock.mockRestore();
    });
  });

  describe('clean', () => {
    it('test', async () => {
      // given
      const translation = new TranlsationTaskComponent();
      translation.show();

      // when
      translation.clean();

      // then
      expect(document.body.querySelector('.container').innerHTML).toEqual('');
    });
  });
});
