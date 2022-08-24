import Popup from './Popup.js';
import { selectors } from './constants.js';

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(selectors.popupForm);
    this._inputs = this._form.querySelectorAll(selectors.inputSelector);
  }

  _getInputValues() {
    this._values = [];
    this._inputs.forEach((input) => this._values.push(input.value));
  }

  returnValues() {
    this._getInputValues();
    return this._values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit);
  }

  hidePopup() {
    super.hidePopup();
    this._form.reset();
  }
}

export default PopupWithForm;
