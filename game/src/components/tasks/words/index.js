import './index.css';
import template from './index.template.html';

import AbstractTaskComponent from '../base';
import WordService from '../../../services/words';

const CONST = {
  letter: {
    container: '.letter_container',
    attribute: { name: 'draggable', value: true },
    selector: '.letter',
    valueClass: 'letter_value',
    valueSelector: '.letter_value',
  },
  task: {
    description: '.task_description',
    submit: '.task_submit',
  },
};

export default class WordTaskComponent extends AbstractTaskComponent {
  constructor() {
    super();
    this.letters = [];
  }

  show() {
    super.show();
    this.modal.innerHTML = template;
  }

  process() {
    return new Promise((resoleve) => {
      this._displayTask();
      this._applyListeners();
      this.modal.querySelector(CONST.task.submit).addEventListener('click', () => {
        if (WordService.isAnswerValid(this._buildAnswer())) {
          resoleve(true);
        }
        resoleve(false);
      });
    });
  }

  clean() {
    super.clean();
    // clean listeners
  }

  _applyListeners() {
    const container = this.modal.querySelector(CONST.letter.container);
    container.addEventListener('dragstart', this._dragStart.bind(this));
    container.addEventListener('dragover', this._dragOver.bind(this));
    container.addEventListener('dragenter', this._dragEnter.bind(this));
    container.querySelectorAll(CONST.letter.valueSelector).forEach((letter) => {
      letter.addEventListener('drop', this._dragDrop.bind(this));
    });
  }

  _dragStart(event) {
    const value = event.target.closest(CONST.letter.valueSelector);
    if (value) {
      this.index = this._getIndexOfLetter(value);
      this.tmpArray = [...this.letters];
    }
  }

  _dragOver(event) {
    const value = event.target.closest(CONST.letter.valueSelector);
    if (value) {
      event.preventDefault();
    }
  }

  _dragEnter(event) {
    const value = event.target.closest(CONST.letter.valueSelector);
    if (value) {
      event.preventDefault();
      const currentElementIndex = this._getIndexOfLetter(value);
      if (currentElementIndex !== this.index) {
        let other = this.tmpArray.slice(0, this.index);
        other = other.concat(this.tmpArray.slice(this.index + 1));
        this.tmpArray = [
          ...other.slice(0, currentElementIndex),
          this.tmpArray[this.index],
          ...other.slice(currentElementIndex),
        ];
        this.index = currentElementIndex;
        this._updateValues(this.tmpArray);
      }
    }
  }

  _updateValues(values) {
    this.modal.querySelectorAll(CONST.letter.valueSelector)
      .forEach((e, index) => {
        e.innerHTML = values[index];
      });
  }

  _dragDrop(event) {
    const value = event.target.closest(CONST.letter.valueSelector);
    if (value) {
      this.letters = this.tmpArray;
    }
  }

  _getIndexOfLetter(element) {
    let resultIndex = -1;
    this.modal.querySelectorAll(CONST.letter.valueSelector)
      .forEach((e, index) => {
        if (e === element) {
          resultIndex = index;
        }
      });
    return resultIndex;
  }

  _displayTask() {
    const fragment = document.createDocumentFragment();
    this.letters = WordService.getRandomTask();
    this.letters.forEach((letter) => {
      const letterElement = this._buildLetterElement(letter);
      fragment.append(letterElement);
    });
    const lettersContainer = this.modal.querySelector(CONST.letter.container);
    lettersContainer.append(fragment);
  }

  _buildLetterElement(value) {
    const letter = this._buildElementWithClasses('span', CONST.letter.valueClass);
    letter.innerHTML = value;
    letter.setAttribute(CONST.letter.attribute.name, CONST.letter.attribute.value);
    const letterContainer = this._buildElementWithClasses('div', 'letter');
    letterContainer.append(letter);
    return letterContainer;
  }

  _buildElementWithClasses(name, ...classes) {
    const element = document.createElement(name);
    if (classes && classes.length !== 0) {
      element.classList.add(classes);
    }
    return element;
  }

  _buildAnswer() {
    const letters = this.modal.querySelector(CONST.letter.container)
      .querySelectorAll(CONST.letter.selector);
    let answer = '';
    for (let i = 0; i < letters.length; i += 1) {
      answer += letters[i].textContent;
    }
    return answer;
  }
}
