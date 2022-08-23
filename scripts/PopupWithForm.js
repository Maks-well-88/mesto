import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input-field');
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
