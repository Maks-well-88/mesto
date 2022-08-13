import Card from './Card.js';
import FormValidator from './FormValidator.js';
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

function showPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', hidePopupByEsc);
}

function hidePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', hidePopupByEsc);
}

function hidePopupByEsc(event) {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    hidePopup(popup);
  }
}

function showProfilePopup(popup) {
  inputTypeName.value = profileName.textContent;
  inputTypeJob.value = profileJob.textContent;
  validatorsList['profile-form'].resetErrors();
  showPopup(popup);
}

function handleCardClick(name, link) {
  showPopup(popupImage);
  imageTitle.textContent = name;
  imageInPopup.src = link;
  imageInPopup.alt = name;
}

function handlePreventDefault(event) {
  event.preventDefault();
}

function handleProfileFormSubmit(event) {
  handlePreventDefault(event);
  profileName.textContent = inputTypeName.value;
  profileJob.textContent = inputTypeJob.value;
  hidePopup(popupProfile);
}

function createCard(name, link) {
  const card = new Card(name, link, selectors.template, handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
}

function handleNewPlaceFormSubmit(event) {
  handlePreventDefault(event);
  blockOfElements.prepend(createCard(inputTypeTitle.value, inputTypeLink.value));
  formNewPlace.reset();
  validatorsList['new-place-form'].resetErrors();
  hidePopup(popupNewPlace);
}

formProfile.addEventListener('submit', handleProfileFormSubmit);
formNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);
buttonAddNewPlace.addEventListener('click', () => showPopup(popupNewPlace));
buttonEditProfile.addEventListener('click', () => showProfilePopup(popupProfile));

buttonsClosePopup.forEach((button) => {
  const popup = button.closest('.popup');
  popup.addEventListener('mousedown', (event) => event.target === event.currentTarget && hidePopup(popup));
  button.addEventListener('click', () => hidePopup(popup));
});

initialCards.forEach((item) => blockOfElements.prepend(createCard(item.name, item.link)));

forms.forEach((form) => {
  const formValidator = new FormValidator(selectors, form);
  const formName = form.getAttribute('name');
  validatorsList[formName] = formValidator;
  formValidator.enableValidation();
});
