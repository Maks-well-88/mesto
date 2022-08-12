import { popupImage, imageTitle, imageInPopup } from './constants.js';
import { showPopup } from './index.js';
import { selectors } from './constants.js';

export class Card {
  constructor(name, link, template) {
    this._name = name;
    this._link = link;
    this._template = template;
  }

  _getTemplate = () => {
    const template = document.querySelector(this._template).content;
    this._element = template.querySelector(selectors.card).cloneNode(true);
    return this._element;
  };

  createCard = () => {
    const card = this._getTemplate();
    const image = card.querySelector(selectors.image);
    image.src = this._link;
    image.alt = this._name;
    card.querySelector(selectors.title).textContent = this._name;
    this._addEventListeners();
    return this._element;
  };

  _deleteCardHendler = () => {
    this._element.remove();
  };

  _likeCardHendler = () => {
    const buttonLikeCard = this._element.querySelector(selectors.buttonLikeCard);
    buttonLikeCard.classList.add('element__like-btn_active');
  };

  _showPopupHendler = () => {
    showPopup(popupImage);
    imageTitle.textContent = this._name;
    imageInPopup.src = this._link;
    imageInPopup.alt = this._name;
  };

  _addEventListeners = () => {
    const buttonDeleteCard = this._element.querySelector(selectors.buttonDeleteCard);
    const buttonLikeCard = this._element.querySelector(selectors.buttonLikeCard);
    const image = this._element.querySelector(selectors.image);
    buttonDeleteCard.addEventListener('click', () => this._deleteCardHendler());
    buttonLikeCard.addEventListener('click', () => this._likeCardHendler());
    image.addEventListener('click', () => this._showPopupHendler());
  };
}
