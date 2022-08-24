import './pages/index.css';
import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import Section from './scripts/Section.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import UserInfo from './scripts/UserInfo.js';
import { initialCards } from './scripts/data.js';
import {
  selectors,
  blockOfElements,
  buttonAddNewPlace,
  buttonEditProfile,
  inputTypeName,
  inputTypeJob,
  profileName,
  profileJob,
  forms,
  validatorsList,
} from './scripts/constants.js';

// create validation
forms.forEach((form) => {
  const formValidator = new FormValidator(selectors, form);
  const formName = form.getAttribute('name');
  validatorsList[formName] = formValidator;
  formValidator.enableValidation();
});

// create card element
const createCard = (name, link) => {
  const card = new Card(name, link, {
    template: selectors.template,
    handleCardClick: (name, link) => {
      imagePopup.showPopup(name, link);
    },
  });
  return card.createCard();
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
  popupSelector: selectors.popupProfile,
  handleFormSubmit: (event) => {
    event.preventDefault();
    const [name, job] = profilePopup.returnValues();
    userInfo.setUserInfo(name, job);
    profilePopup.hidePopup();
  },
});

// create popup with new place
const newPlacePopup = new PopupWithForm({
  popupSelector: selectors.popupNewPlace,
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
const imagePopup = new PopupWithImage(selectors.popupImage);

// create user info
const userInfo = new UserInfo({
  name: profileName.textContent,
  job: profileJob.textContent,
});

// add eventlisteners
profilePopup.setEventListeners();
newPlacePopup.setEventListeners();
imagePopup.setEventListeners();
buttonAddNewPlace.addEventListener('click', () => newPlacePopup.showPopup());
buttonEditProfile.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  inputTypeName.value = name;
  inputTypeJob.value = job;
  validatorsList['profile-form'].resetErrors();
  profilePopup.showPopup();
});

// render initial cards
cardList.renderItems();
