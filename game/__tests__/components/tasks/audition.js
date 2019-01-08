import 'jest';
import '@babel/polyfill';
import AuditionTaskComponent from '../../../src/components/tasks/audition';
import SpeechService from '../../../src/services/speech';

describe('AuditionTaskComponent', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div class="container"></div>';
    jest.restoreAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('show', () => {
    it('render', () => {
      const audition = new AuditionTaskComponent();
      audition.show();

      expect(document.body.querySelector('div.modal>div.modal_content>div.task')).toBeDefined();
      expect(document.body.querySelector('div.modal>div.modal_content>div.task>p.task_title')).toBeDefined();
      expect(document.body.querySelector('p.task_title').innerHTML)
        .toEqual('Please enter word that was pronounces');
      expect(document.body.querySelector('div.modal>div.modal_content>div.task>button.task_play')).toBeDefined();
      expect(document.body.querySelector('div.modal>div.modal_content>div.task>input.task_input')).toBeDefined();
      expect(document.body.querySelector('div.modal>div.modal_content>div.task>button')).toBeDefined();
    });
  });

  describe('process', () => {
    it('press submit with valid value', async () => {
      // given
      const value = 'test text';
      const isAnswerValidMock = jest.spyOn(SpeechService, 'isAnswerValid')
        .mockImplementationOnce(() => true);

      const audition = new AuditionTaskComponent();
      audition.show();
      const button = document.body.querySelector('.task_submit');
      const input = document.body.querySelector('.task_input');
      input.value = value;

      // when
      const result = audition.process(button);
      button.click();
      const response = await (() => result)();
      expect(response).toEqual(true);
      // then
      expect(isAnswerValidMock.mock.calls[0][1]).toEqual(value);
      expect(isAnswerValidMock.mock.results[0].value).toBeTruthy();
      isAnswerValidMock.mockRestore();
    });

    it('press pronounce button', async () => {
      // given
      const value = 'test text';
      const isAnswerValidMock = jest.spyOn(SpeechService, 'isAnswerValid')
        .mockImplementationOnce(() => true);
      const pronounce = jest.spyOn(SpeechService, 'pronounce').mockImplementationOnce(() => true);
      const task = jest.spyOn(SpeechService, 'getRandomTask').mockImplementationOnce(() => value);

      const audition = new AuditionTaskComponent();
      audition.show();
      const button = document.body.querySelector('.task_submit');
      const pronounceButton = document.body.querySelector('.task_play');
      const input = document.body.querySelector('.task_input');
      input.value = value;

      // when
      const result = audition.process(button);
      pronounceButton.click();
      button.click();
      const response = await (() => result)();
      expect(response).toEqual(true);
      // then
      expect(isAnswerValidMock.mock.calls[0][1]).toEqual(value);
      expect(isAnswerValidMock.mock.results[0].value).toBeTruthy();
      expect(pronounce.mock.calls[0][0]).toEqual(value);
      expect(task).toHaveBeenCalledTimes(1);
      isAnswerValidMock.mockRestore();
    });

    it('press submit with invalid answer', async () => {
      // given
      const value = 'test invalid text';
      const isAnswerValidMock = jest.spyOn(SpeechService, 'isAnswerValid')
        .mockImplementationOnce(() => false);

      const audition = new AuditionTaskComponent();
      audition.show();
      const button = document.body.querySelector('.task_submit');
      const input = document.body.querySelector('.task_input');
      input.value = value;

      // when
      const result = audition.process(button);
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
      const audition = new AuditionTaskComponent();
      audition.show();

      // when
      audition.clean();

      // then
      expect(document.body.querySelector('.container').innerHTML).toEqual('');
    });
  });
});
