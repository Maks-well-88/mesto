import Popup from './Popup.js';
import { selectors } from '../utils/constants.js';

class ConfirmationPopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector(selectors.submitButton);
  }

  setSubmitAction = (callback) => {
    this._submitButton.addEventListener('click', callback);
  };
}

export default ConfirmationPopup;
