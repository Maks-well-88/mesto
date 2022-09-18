import Popup from './Popup.js';
import { selectors } from '../utils/constants.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageTitle = this._popup.querySelector(selectors.popupImageTitle);
    this._imageInPopup = this._popup.querySelector(selectors.popupWithImage);
  }

  showPopup = (name, link) => {
    this._imageTitle.textContent = name;
    this._imageInPopup.src = link;
    this._imageInPopup.alt = name;
    super.showPopup();
  };
}

export default PopupWithImage;
