import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
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

function handleCardClick(name, link) {
  showPopup(popupImage);
  imageTitle.textContent = name;
  imageInPopup.src = link;
  imageInPopup.alt = name;
}

// create validation
forms.forEach((form) => {
  const formValidator = new FormValidator(selectors, form);
  const formName = form.getAttribute('name');
  validatorsList[formName] = formValidator;
  formValidator.enableValidation();
});

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

cardList.renderItems();

// create new popup objects
const profilePopup = new Popup('.popup_type_profile');
const newPlacePopup = new Popup('.popup_type_new-place');

const showProfilePopup = () => {
  inputTypeName.value = profileName.textContent;
  inputTypeJob.value = profileJob.textContent;
  validatorsList['profile-form'].resetErrors();
  profilePopup.showPopup();
};

const handlePreventDefault = (event) => {
  event.preventDefault();
};

const handleProfileFormSubmit = (event) => {
  handlePreventDefault(event);
  profileName.textContent = inputTypeName.value;
  profileJob.textContent = inputTypeJob.value;
  profilePopup.hidePopup();
};

const handleNewPlaceFormSubmit = (event) => {
  handlePreventDefault(event);
  const newCard = new Section({}, blockOfElements);
  newCard.addItem(createCard(inputTypeTitle.value, inputTypeLink.value));
  formNewPlace.reset();
  validatorsList['new-place-form'].resetErrors();
  newPlacePopup.hidePopup();
};

// add eventlisteners
buttonAddNewPlace.addEventListener('click', () => newPlacePopup.showPopup());
buttonEditProfile.addEventListener('click', () => showProfilePopup());
formProfile.addEventListener('submit', handleProfileFormSubmit);
formNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);
profilePopup.setEventListeners();
newPlacePopup.setEventListeners();
