import Popup from './Popup.js';
import { selectors } from './constants.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageTitle = document.querySelector(selectors.popupImageTitle);
    this._imageInPopup = document.querySelector(selectors.popupWithImage);
  }

  showPopup = (name, link) => {
    super.showPopup();
    this._imageTitle.textContent = name;
    this._imageInPopup.src = link;
    this._imageInPopup.alt = name;
  };
}

export default PopupWithImage;
