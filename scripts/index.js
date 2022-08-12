import { Card } from './card.js';
import { FormValidator } from './formValidator.js';
import { initialCards } from './data.js';
import { selectors, blockOfElements, popupProfile, popupNewPlace, buttonAddNewPlace, buttonEditProfile, buttonsClosePopup, formProfile, formNewPlace, buttonNewPlaceSubmit, inputTypeName, inputTypeJob, inputTypeTitle, inputTypeLink, profileName, profileJob, forms } from './constants.js';

export function showPopup(popup) {
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
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', hidePopupByEsc);
  }
}

function showProfilePopup(popup) {
  const form = popup.querySelector(selectors.popupForm);
  const formValidator = new FormValidator(selectors, form);
  formValidator.resetErrors(popup);
  showPopup(popup);
  inputTypeName.value = profileName.textContent;
  inputTypeJob.value = profileJob.textContent;
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

function handleNewPlaceFormSubmit(event) {
  handlePreventDefault(event);
  const card = new Card(inputTypeTitle.value, inputTypeLink.value, selectors.template);
  blockOfElements.prepend(card.createCard());
  formNewPlace.reset();
  buttonNewPlaceSubmit.classList.add('popup__button-save_disabled');
  buttonNewPlaceSubmit.disabled = true;
  hidePopup(popupNewPlace);
}

formProfile.addEventListener('submit', handleProfileFormSubmit);
formNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);
buttonAddNewPlace.addEventListener('click', () => showPopup(popupNewPlace));
buttonEditProfile.addEventListener('click', () => showProfilePopup(popupProfile));
buttonsClosePopup.forEach((button) => {
  const popup = button.closest('.popup');
  popup.addEventListener('click', (event) => event.target === event.currentTarget && hidePopup(popup));
  button.addEventListener('click', () => hidePopup(popup));
});

function createInitialCards(initialCards) {
  initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, selectors.template);
    blockOfElements.prepend(card.createCard());
  });
}

function setFormValidation(forms) {
  forms.forEach((form) => {
    const formValidator = new FormValidator(selectors, form);
    formValidator.enableValidation();
  });
}

createInitialCards(initialCards);
setFormValidation(forms);
