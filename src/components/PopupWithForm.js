import Popup from './Popup.js';
import { selectors } from './constants.js';

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, handleResetErrors }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleResetErrors = handleResetErrors;
    this._form = this._popup.querySelector(selectors.popupForm);
    this._inputs = this._form.querySelectorAll(selectors.inputSelector);
  }

  _getInputValues() {
    const data = {};
    this._inputs.forEach((input) => (data[input.name] = input.value));
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  hidePopup() {
    super.hidePopup();
    this._form.reset();
    this._handleResetErrors();
  }
}

export default PopupWithForm;
