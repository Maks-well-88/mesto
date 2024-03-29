import { selectors } from '../utils/constants.js';

class Card {
  constructor({ data, template, handleCardClick, handleDeleteIconClick, handleLikeClick }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = data.currentUser;
    this._ownerId = data.owner._id;
    this._template = template;
    this._handleLikeClick = handleLikeClick;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
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
    this._likeCounter = card.querySelector(selectors.likeCounter);
    this._buttonDeleteCard = card.querySelector(selectors.buttonDeleteCard);
    this._buttonDeleteCard.classList.add(
      this._userId === this._ownerId ? 'element__delete-btn_active' : 'element__delete-btn'
    );
    this.setLikesInfo(this._likes);
    this._image.src = this._link;
    this._image.alt = this._name;
    card.querySelector(selectors.title).textContent = this._name;
    this._setEventListeners();
    return this._element;
  };

  getId = () => {
    return this._cardId;
  };

  isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  toggleLikesColor = () => {
    this.isLiked()
      ? this._buttonLikeCard.classList.add('element__like-btn_active')
      : this._buttonLikeCard.classList.remove('element__like-btn_active');
  };

  setLikesInfo = (likes) => {
    this._likes = likes;
    this._likeCounter.textContent = likes.length;
    this.toggleLikesColor();
  };

  removeCard = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners = () => {
    this._buttonDeleteCard.addEventListener('click', () => this._handleDeleteIconClick());
    this._buttonLikeCard.addEventListener('click', () => this._handleLikeClick());
    this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  };
}

export default Card;
