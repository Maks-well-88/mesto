import { selectors } from './constants.js';

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(selectors.closeButton);
    this._submitButton = this._popup.querySelector(selectors.submitButton);
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.hidePopup();
    }
  };

  showPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  hidePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  renderLoading(isLoading, text) {
    isLoading ? (this._submitButton.textContent = text) : (this._submitButton.textContent = text);
  }

  setEventListeners() {
    this._popup.addEventListener(
      'mousedown',
      (event) => event.target === event.currentTarget && this.hidePopup()
    );
    this._closeButton.addEventListener('click', () => this.hidePopup());
  }
}

export default Popup;
