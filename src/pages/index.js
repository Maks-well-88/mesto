import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { initialCards } from '../components/data.js';
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
  avatar,
} from '../components/constants.js';

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
    renderer: (items) => {
      items.forEach((item) => {
        cardList.addItem(createCard(item.name, item.link));
      });
    },
  },
  blockOfElements
);

// create popup with profile info
const profilePopup = new PopupWithForm({
  popupSelector: selectors.popupProfile,
  handleFormSubmit: (data) => {
    const { name, job } = data;
    userInfo.setUserInfo(name, job);
    profilePopup.hidePopup();
  },
});

// create popup with new place
const newPlacePopup = new PopupWithForm({
  popupSelector: selectors.popupNewPlace,
  handleFormSubmit: (data) => {
    const { title, url } = data;
    cardList.addItem(createCard(title, url));
    newPlacePopup.hidePopup();
    validatorsList['new-place-form'].resetErrors();
  },
});

// create popup with image
const imagePopup = new PopupWithImage(selectors.popupImage);

// download user information from the server
new Api({
  url: 'https://nomoreparties.co/v1/cohort-50/users/me',
  contentType: 'application/json',
})
  .getUserInfo()
  .then((data) => {
    profileName.textContent = data.name;
    profileJob.textContent = data.about;
    avatar.src = data.avatar;
  })
  .catch((err) => console.error(err));

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
cardList.renderItems(initialCards);
