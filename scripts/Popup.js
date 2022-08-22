class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close');
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.hidePopup();
    }
  };

  showPopup = () => {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  hidePopup = () => {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  setEventListeners() {
    this._popup.addEventListener(
      'mousedown',
      (event) => event.target === event.currentTarget && this.hidePopup()
    );
    this._closeButton.addEventListener('click', () => this.hidePopup());
  }
}

export default Popup;
