import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import { initialCards } from './data.js';
import {
  selectors,
  blockOfElements,
  popupImage,
  imageTitle,
  imageInPopup,
  popupProfile,
  popupNewPlace,
  buttonAddNewPlace,
  buttonEditProfile,
  buttonsClosePopup,
  formProfile,
  formNewPlace,
  inputTypeName,
  inputTypeJob,
  inputTypeTitle,
  inputTypeLink,
  profileName,
  profileJob,
  forms,
  validatorsList,
} from './constants.js';

// create validation
forms.forEach((form) => {
  const formValidator = new FormValidator(selectors, form);
  const formName = form.getAttribute('name');
  validatorsList[formName] = formValidator;
  formValidator.enableValidation();
});

// create handler for card
const handleCardClick = (name, link) => {
  imagePopup.showPopup(name, link);
};

// create card
const createCard = (name, link) => {
  const card = new Card(name, link, selectors.template, handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
};

// create initial cards
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => cardList.addItem(createCard(item.name, item.link)),
  },
  blockOfElements
);

// create popup with profile info
const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (event) => {
    event.preventDefault();
    profileName.textContent = inputTypeName.value;
    profileJob.textContent = inputTypeJob.value;
    profilePopup.hidePopup();
  },
});

// create popup with new place
const newPlacePopup = new PopupWithForm({
  popupSelector: '.popup_type_new-place',
  handleFormSubmit: (event) => {
    event.preventDefault();
    const newCard = new Section({}, blockOfElements);
    newCard.addItem(createCard(inputTypeTitle.value, inputTypeLink.value));
    newPlacePopup.hidePopup();
    validatorsList['new-place-form'].resetErrors();
  },
});

// create popup with image
const imagePopup = new PopupWithImage('.popup_type_image');

const showProfilePopup = () => {
  inputTypeName.value = profileName.textContent;
  inputTypeJob.value = profileJob.textContent;
  validatorsList['profile-form'].resetErrors();
  profilePopup.showPopup();
};

// add eventlisteners
buttonAddNewPlace.addEventListener('click', () => newPlacePopup.showPopup());
buttonEditProfile.addEventListener('click', () => showProfilePopup());
profilePopup.setEventListeners();
newPlacePopup.setEventListeners();
imagePopup.setEventListeners();

// render initial cards
cardList.renderItems();
