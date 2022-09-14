import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import ConfirmationPopup from '../components/ConfirmationPopup.js';
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

// initialized variable
let userId = null;

// create profile api
const profileApi = new Api({
  url: 'https://nomoreparties.co/v1/cohort-50/users/me',
  contentType: 'application/json',
});

// create cards api
const cardsApi = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-50/cards',
  contentType: 'application/json',
});

// create validation
forms.forEach((form) => {
  const formValidator = new FormValidator(selectors, form);
  const formName = form.getAttribute('name');
  validatorsList[formName] = formValidator;
  formValidator.enableValidation();
});

// create card element
const createCard = (data) => {
  const card = new Card({
    data: { ...data, currentUser: userId },
    template: selectors.template,
    handleCardClick: (name, link) => {
      imagePopup.showPopup(name, link);
    },
    handleDeleteIconClick: () => {
      console.log(card.getId());
      confirmationPopup.showPopup();
      confirmationPopup.setSubmitAction(() => {
        cardsApi
          .removeCard(card.getId())
          .then(() => {
            card.removeCard();
            confirmationPopup.hidePopup();
          })
          .catch((err) => console.error(err));
      });
    },
  });
  return card.createCard();
};

// create list of cards
const cardList = new Section({
  container: blockOfElements,
  renderer: (items) => {
    items.reverse().forEach((item) => cardList.addItem(createCard(item)));
  },
});

// create popup with profile info
const profilePopup = new PopupWithForm({
  popupSelector: selectors.popupProfile,
  handleFormSubmit: (data) => {
    const { name, job } = data;
    profileApi
      .editProfile({ name: name, about: job })
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about);
        profilePopup.hidePopup();
      })
      .catch((err) => console.error(err));
  },
});

// create popup with new place
const newPlacePopup = new PopupWithForm({
  popupSelector: selectors.popupNewPlace,
  handleFormSubmit: (data) => {
    const { title, url } = data;
    cardsApi.addNewCard({ name: title, link: url }).then((data) => {
      cardList.addItem(createCard(data));
      newPlacePopup.hidePopup();
      validatorsList['new-place-form'].resetErrors();
    });
  },
});

// create popup with image
const imagePopup = new PopupWithImage(selectors.popupImage);

// create confirmation popup
const confirmationPopup = new ConfirmationPopup(selectors.popupConfirmation);

// download user information & render initial cards
Promise.all([profileApi.getInfo(), cardsApi.getInfo()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    avatar.src = userData.avatar;
    cardList.renderItems(cards);
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
confirmationPopup.setEventListeners();
buttonAddNewPlace.addEventListener('click', () => newPlacePopup.showPopup());
buttonEditProfile.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  inputTypeName.value = name;
  inputTypeJob.value = job;
  validatorsList['profile-form'].resetErrors();
  profilePopup.showPopup();
});
