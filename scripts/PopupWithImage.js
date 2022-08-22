import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageTitle = document.querySelector('.popup__image-title');
    this._imageInPopup = document.querySelector('.popup__image');
  }

  showPopup = (name, link) => {
    super.showPopup();
    this._imageTitle.textContent = name;
    this._imageInPopup.src = link;
    this._imageInPopup.alt = name;
  };
}

export default PopupWithImage;
