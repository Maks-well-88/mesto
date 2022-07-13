const initialCards = [
  {
    name: 'Сочи',
    link: './images/dima-fedorov-sochi.jpg',
  },
  {
    name: 'Ялта',
    link: './images/dmitry-bogatyrev-yalta.jpg',
  },
  {
    name: 'Домбай',
    link: './images/kirill-pershin-dombai.jpg',
  },
  {
    name: 'Эльбрус',
    link: './images/kirill-pershin-elbrus.jpg',
  },
  {
    name: 'Карачаево-Черкессия',
    link: './images/kirill-pershin-karachaevsk.jpg',
  },
  {
    name: 'Алтай',
    link: './images/sergei-wing-altay.jpg',
  },
];

const selectors = {
  block: '.elements',
  card: '.element',
  template: '.card-template',
  image: '.element__image',
  imagePopupImage: '.popup__image',
  buttonDeleteCard: '.element__delete-btn',
  title: '.element__title',
  titlePopupImage: '.popup__image-title',
  buttonAddNewPlace: '.profile__add-button',
  buttonEditProfile: '.profile__edit-button',
  buttonClosePopup: '.popup__close',
  popupProfile: '.popup',
  popupNewPlace: '.popup_type_new-place',
  popupImage: '.popup_type_image',
  popupForm: '.popup__form',
  inputTypeName: '.popup__input-field_type_name',
  inputTypeJob: '.popup__input-field_type_job',
  inputTypeTitle: '.popup__input-field_type_title',
  inputTypeLink: '.popup__input-field_type_link',
  profileName: '.profile__name',
  profileJob: '.profile__job',
  buttonLikeCard: '.element__like-btn',
};

const blockOfElements = document.querySelector(selectors.block);
const popupProfile = document.querySelector(selectors.popupProfile);
const popupNewPlace = document.querySelector(selectors.popupNewPlace);
const popupImage = document.querySelector(selectors.popupImage);
const buttonAddNewPlace = document.querySelector(selectors.buttonAddNewPlace);
const buttonEditProfile = document.querySelector(selectors.buttonEditProfile);
const buttonCloseProfilePopup = document.querySelector(selectors.buttonClosePopup);
const buttonClosePlacePopup = popupNewPlace.querySelector(selectors.buttonClosePopup);
const buttonCloseImagePopup = popupImage.querySelector(selectors.buttonClosePopup);
const formProfile = popupProfile.querySelector(selectors.popupForm);
const formNewPlace = popupNewPlace.querySelector(selectors.popupForm);
const inputTypeName = formProfile.querySelector(selectors.inputTypeName);
const inputTypeJob = formProfile.querySelector(selectors.inputTypeJob);
const inputTypeTitle = formNewPlace.querySelector(selectors.inputTypeTitle);
const inputTypeLink = formNewPlace.querySelector(selectors.inputTypeLink);
let profileName = document.querySelector(selectors.profileName);
let profileJob = document.querySelector(selectors.profileJob);

function showPopup(popup) {
  popup.classList.add('popup_opened');
  if (inputTypeName) {
    inputTypeName.value = profileName.textContent;
    inputTypeJob.value = profileJob.textContent;
  }
}

function hidePopup(popup) {
  popup.classList.remove('popup_opened');
}

function createCard(name, link) {
  const card = document.querySelector(selectors.template).content.querySelector(selectors.card).cloneNode(true);
  const buttonLikeCard = card.querySelector(selectors.buttonLikeCard);
  const buttonDeleteCard = card.querySelector(selectors.buttonDeleteCard);
  const image = card.querySelector(selectors.image);
  card.querySelector(selectors.title).textContent = name;
  card.querySelector(selectors.image).src = link;
  card.querySelector(selectors.image).alt = name;
  image.onclick = () => {
    showPopup(popupImage);
    popupImage.querySelector(selectors.titlePopupImage).textContent = name;
    popupImage.querySelector(selectors.imagePopupImage).src = link;
    popupImage.querySelector(selectors.imagePopupImage).alt = name;
  };
  buttonLikeCard.onclick = () => buttonLikeCard.classList.add('element__like-btn_active');
  buttonDeleteCard.onclick = () => card.remove();
  blockOfElements.prepend(card);
}

function createInitialCards(initialCards) {
  initialCards.forEach((item) => createCard(item.name, item.link));
}

function formProfileSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = inputTypeName.value;
  profileJob.textContent = inputTypeJob.value;
  hidePopup(popupProfile);
}

function formNewPlaceSubmitHandler(event) {
  event.preventDefault();
  createCard(inputTypeTitle.value, inputTypeLink.value);
  inputTypeTitle.value = '';
  inputTypeLink.value = '';
  hidePopup(popupNewPlace);
}

createInitialCards(initialCards);
buttonAddNewPlace.addEventListener('click', () => showPopup(popupNewPlace));
buttonEditProfile.addEventListener('click', () => showPopup(popupProfile));
buttonCloseProfilePopup.addEventListener('click', () => hidePopup(popupProfile));
buttonClosePlacePopup.addEventListener('click', () => hidePopup(popupNewPlace));
buttonCloseImagePopup.addEventListener('click', () => hidePopup(popupImage));
formProfile.addEventListener('submit', formProfileSubmitHandler);
formNewPlace.addEventListener('submit', formNewPlaceSubmitHandler);
