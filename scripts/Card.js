import { selectors } from './constants.js';

class Card {
  constructor(name, link, { template, handleCardClick }) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate = () => {
    const template = document.querySelector(this._template).content;
    this._element = template.querySelector(selectors.card).cloneNode(true);
    return this._element;
  };

  createCard = () => {
    const card = this._getTemplate();
    this._image = card.querySelector(selectors.image);
    this._buttonLikeCard = card.querySelector(selectors.buttonLikeCard);
    this._buttonDeleteCard = card.querySelector(selectors.buttonDeleteCard);
    this._image.src = this._link;
    this._image.alt = this._name;
    card.querySelector(selectors.title).textContent = this._name;
    this._setEventListeners();
    return this._element;
  };

  _handleDeleteClick = () => {
    this._element.remove();
  };

  _handleLikeClick = () => {
    this._buttonLikeCard.classList.toggle('element__like-btn_active');
  };

  _setEventListeners = () => {
    this._buttonDeleteCard.addEventListener('click', () => this._handleDeleteClick());
    this._buttonLikeCard.addEventListener('click', () => this._handleLikeClick());
    this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  };
}

export default Card;
