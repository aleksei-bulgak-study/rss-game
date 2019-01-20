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
    attr: 'tabindex',
    valueSelector: '.letter_value',
  },
  task: {
    description: '.task_description',
    submit: '.task_submit',
  },
  key: {
    left: 37,
    right: 39,
    up: 38,
    down: 40,
    enter: 13,
  },
  move: {
    right: 1,
    left: -1,
  },
  navigation: {
    selector: '.navigable',
    class: 'navigable',
  },
  selected: 'selected',
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
    return new Promise((resolve) => {
      this._displayTask();
      this._applyListeners();
      const submit = this.modal.querySelector(CONST.task.submit);
      submit.addEventListener('click', () => {
        if (WordService.isAnswerValid(this._buildAnswer())) {
          resolve(true);
        }
        resolve(false);
      });
      this.modal.addEventListener('keydown', (event) => {
        if (event.keyCode === CONST.key.enter) {
          submit.click();
        }
      });
    });
  }

  _applyListeners() {
    const container = this.modal.querySelector(CONST.letter.container);
    container.addEventListener('dragstart', this._dragStart.bind(this));
    container.addEventListener('dragover', this._dragOver.bind(this));
    container.addEventListener('dragenter', this._dragEnter.bind(this));
    container.querySelectorAll(CONST.letter.valueSelector).forEach((letter) => {
      letter.addEventListener('drop', this._dragDrop.bind(this));
    });

    container.addEventListener('keydown', this._navigation.bind(this));
  }

  _dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
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
      this.tmpArray = this._move(value, this.tmpArray);
    }
  }

  _move(element, letters) {
    let tmpArray = letters;
    const currentElementIndex = this._getIndexOfLetter(element);
    if (currentElementIndex !== this.index) {
      let other = tmpArray.slice(0, this.index);
      other = other.concat(tmpArray.slice(this.index + 1));
      tmpArray = [
        ...other.slice(0, currentElementIndex),
        tmpArray[this.index],
        ...other.slice(currentElementIndex),
      ];
      this.index = currentElementIndex;
      this._updateValues(tmpArray);
    }
    return tmpArray;
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

  _navigation(event) {
    if (event.keyCode === CONST.key.up) {
      event.stopPropagation();
      this._selectFocused(event.target);
    } else if (event.keyCode === CONST.key.down) {
      event.stopPropagation();
      this._deselectFocused();
    } else if (event.keyCode === CONST.key.left) {
      event.stopPropagation();
      this._moveSelectedFocuced(event.target, CONST.move.left);
    } else if (event.keyCode === CONST.key.right) {
      event.stopPropagation();
      this._moveSelectedFocuced(event.target, CONST.move.right);
    }
  }

  _getNavigable(element) {
    if (element) {
      const navElement = element.closest(CONST.navigation.selector);
      if (navElement) {
        return navElement;
      }
    }
    return this.modal.querySelector(CONST.navigation.selector);
  }

  _selectFocused(element) {
    if (!this.selected) {
      this.selected = this._getNavigable(element);
      this.selected.focus();
      this.selected.classList.add(CONST.selected);
    }
  }

  _deselectFocused() {
    this.selected.classList.remove(CONST.selected);
    this.selected = null;
  }

  _moveSelectedFocuced(element, direction) {
    const focused = document.activeElement;
    if (this.selected) {
      this._moveSelected(direction);
    } else if (focused.classList.contains(CONST.navigation.class)) {
      this._moveFocus(focused, direction);
    }
  }

  _moveSelected(direction) {
    const navigables = this.modal.querySelectorAll(CONST.navigation.selector);
    this.index = Array.prototype.indexOf.call(navigables, this.selected);
    navigables[this.index].classList.remove(CONST.selected);
    const newPosition = this._moveFocus(this.selected, direction);
    this.letters = this._move(
      navigables[newPosition].querySelector(CONST.letter.valueSelector),
      this.letters,
    );
    this.selected = navigables[newPosition];
    this.selected.focus();
    this.selected.classList.add(CONST.selected);
  }

  _moveFocus(element, direction) {
    const navigables = this.modal.querySelectorAll(CONST.navigation.selector);
    let index = Array.prototype.indexOf.call(navigables, element);
    index = index === -1 ? 0 : index + direction;
    index = index < 0 ? navigables.length - 1 : index;
    index = index >= navigables.length ? 0 : index;
    navigables[index].focus();
    return index;
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
    this.letters.forEach((letter, index) => {
      const letterElement = this._buildLetterElement(letter, index);
      fragment.append(letterElement);
    });
    const lettersContainer = this.modal.querySelector(CONST.letter.container);
    lettersContainer.append(fragment);
  }

  _buildLetterElement(value, index) {
    const letter = this._buildElementWithClasses('span', CONST.letter.valueClass);
    letter.innerHTML = value;
    letter.setAttribute(CONST.letter.attribute.name, CONST.letter.attribute.value);
    const letterContainer = this._buildElementWithClasses('div', 'letter', CONST.navigation.class);
    letterContainer.setAttribute(CONST.letter.attr, index);
    letterContainer.append(letter);
    return letterContainer;
  }

  _buildElementWithClasses(name, ...classes) {
    const element = document.createElement(name);
    if (classes && classes.length !== 0) {
      element.classList.add(...classes);
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
