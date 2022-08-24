import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
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
    const [name, job] = profilePopup.returnValues();
    userInfo.setUserInfo(name, job);
    profilePopup.hidePopup();
  },
});

// create popup with new place
const newPlacePopup = new PopupWithForm({
  popupSelector: '.popup_type_new-place',
  handleFormSubmit: (event) => {
    event.preventDefault();
    const newCard = new Section({}, blockOfElements);
    const [title, link] = newPlacePopup.returnValues();
    newCard.addItem(createCard(title, link));
    newPlacePopup.hidePopup();
    validatorsList['new-place-form'].resetErrors();
  },
});

// create popup with image
const imagePopup = new PopupWithImage('.popup_type_image');

// create user info
const userInfo = new UserInfo({
  name: profileName.textContent,
  job: profileJob.textContent,
});

// show profile popup
const showProfilePopup = () => {
  const { name, job } = userInfo.getUserInfo();
  inputTypeName.value = name;
  inputTypeJob.value = job;
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
