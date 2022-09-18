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
  buttonEditAvatar,
  inputTypeName,
  inputTypeJob,
  profileName,
  profileJob,
  forms,
  validatorsList,
  avatar,
} from '../utils/constants.js';

// initialized variable
let userId = null;

// create api
const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-50',
  contentType: 'application/json',
  token: 'b0180cd6-e00d-4c46-af25-2755ea60dd90',
});

// create profile api
// const api = new Api({
//   url: 'https://nomoreparties.co/v1/cohort-50/users/me',
//   contentType: 'application/json',
// });

// create cards api
// const api = new Api({
//   url: 'https://mesto.nomoreparties.co/v1/cohort-50/cards',
//   contentType: 'application/json',
// });

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
    handleCardClick: (name, link) => imagePopup.showPopup(name, link),
    handleLikeClick: () => {
      api
        .changelikeStatusCard(card.getId(), card.isLiked())
        .then((data) => card.setLikesInfo(data.likes))
        .catch((err) => console.error(err));
    },
    handleDeleteIconClick: () => {
      confirmationPopup.renderLoading(false, 'Да');
      confirmationPopup.showPopup();
      confirmationPopup.setSubmitAction(() => {
        confirmationPopup.renderLoading(true, 'Удаление...');
        api
          .removeCard(card.getId())
          .then(() => card.removeCard())
          .catch((err) => console.error(err))
          .finally(() => confirmationPopup.hidePopup());
      });
    },
  });
  return card.createCard();
};

// create list of cards
const cardList = new Section({
  container: blockOfElements,
  renderer: (items) => items.reverse().forEach((item) => cardList.addItem(createCard(item))),
});

// create popup with profile info
const profilePopup = new PopupWithForm({
  popupSelector: selectors.popupProfile,
  handleResetErrors: () => validatorsList['profile-form'].resetErrors(),
  handleFormSubmit: ({ name, job }) => {
    profilePopup.renderLoading(true, 'Сохранение...');
    api
      .editProfile({ name: name, about: job })
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about);
        profilePopup.hidePopup();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        profilePopup.hidePopup();
        profilePopup.renderLoading(false, 'Сохранить');
      });
  },
});

// create popup with new place
const newPlacePopup = new PopupWithForm({
  popupSelector: selectors.popupNewPlace,
  handleResetErrors: () => validatorsList['new-place-form'].resetErrors(),
  handleFormSubmit: ({ title, url }) => {
    newPlacePopup.renderLoading(true, 'Создание...');
    api
      .addNewCard({ name: title, link: url })
      .then((data) => {
        cardList.addItem(createCard(data));
        validatorsList['new-place-form'].resetErrors();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        newPlacePopup.hidePopup();
        newPlacePopup.renderLoading(false, 'Создать');
      });
  },
});

// create popup with image
const imagePopup = new PopupWithImage(selectors.popupImage);

// create confirmation popup
const confirmationPopup = new ConfirmationPopup(selectors.popupConfirmation);

// create popup for change avatar
const avatarPopup = new PopupWithForm({
  popupSelector: selectors.popupAvatar,
  handleResetErrors: () => validatorsList['avatar-form'].resetErrors(),
  handleFormSubmit: ({ avatar_url }) => {
    avatarPopup.renderLoading(true, 'Сохранение...');
    // const { avatar_url } = data;
    api
      .changeAvatarImage(avatar_url)
      .then((data) => {
        avatar.src = data.avatar;
        validatorsList['avatar-form'].resetErrors();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        avatarPopup.hidePopup();
        avatarPopup.renderLoading(false, 'Сохранить');
      });
  },
});

// download user information & render initial cards
Promise.all([api.getInfo(), api.renderInitialCards()])
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
avatarPopup.setEventListeners();
confirmationPopup.setEventListeners();
buttonEditAvatar.addEventListener('click', () => avatarPopup.showPopup());
buttonAddNewPlace.addEventListener('click', () => newPlacePopup.showPopup());
buttonEditProfile.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  inputTypeName.value = name;
  inputTypeJob.value = job;
  validatorsList['profile-form'].resetErrors();
  profilePopup.showPopup();
});
