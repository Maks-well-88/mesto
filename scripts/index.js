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
  popup: '.popup',
  titlePopupImage: '.popup__image-title',
  buttonAddNewPlace: '.profile__add-button',
  buttonEditProfile: '.profile__edit-button',
  buttonClosePopup: '.popup__close',
  buttonFormSubmit: '.popup__button-save',
  popupProfile: '.popup_type_profile',
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
const imageInPopup = popupImage.querySelector(selectors.imagePopupImage);
const imageTitle = popupImage.querySelector(selectors.titlePopupImage);
const buttonAddNewPlace = document.querySelector(selectors.buttonAddNewPlace);
const buttonEditProfile = document.querySelector(selectors.buttonEditProfile);
const buttonsClosePopup = document.querySelectorAll(selectors.buttonClosePopup);
const formProfile = popupProfile.querySelector(selectors.popupForm);
const formNewPlace = popupNewPlace.querySelector(selectors.popupForm);
const buttonNewPlaceSubmit = formNewPlace.querySelector(selectors.buttonFormSubmit);
const inputTypeName = formProfile.querySelector(selectors.inputTypeName);
const inputTypeJob = formProfile.querySelector(selectors.inputTypeJob);
const inputTypeTitle = formNewPlace.querySelector(selectors.inputTypeTitle);
const inputTypeLink = formNewPlace.querySelector(selectors.inputTypeLink);
const profileName = document.querySelector(selectors.profileName);
const profileJob = document.querySelector(selectors.profileJob);
const cardTemplate = document.querySelector(selectors.template);

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
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', hidePopupByEsc);
  }
}

function showProfilePopup(popup) {
  resetErrors(popup);
  showPopup(popup);
  inputTypeName.value = profileName.textContent;
  inputTypeJob.value = profileJob.textContent;
}

function createCard(name, link) {
  const card = cardTemplate.content.querySelector(selectors.card).cloneNode(true);
  const buttonLikeCard = card.querySelector(selectors.buttonLikeCard);
  const buttonDeleteCard = card.querySelector(selectors.buttonDeleteCard);
  const image = card.querySelector(selectors.image);
  card.querySelector(selectors.title).textContent = name;
  image.src = link;
  image.alt = name;

  image.addEventListener('click', () => {
    showPopup(popupImage);
    imageTitle.textContent = name;
    imageInPopup.src = link;
    imageInPopup.alt = name;
  });

  buttonLikeCard.addEventListener('click', () => {
    buttonLikeCard.classList.add('element__like-btn_active');
  });

  buttonDeleteCard.addEventListener('click', () => {
    card.remove();
  });

  return card;
}

function createInitialCards(initialCards) {
  initialCards.forEach((item) => blockOfElements.prepend(createCard(item.name, item.link)));
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
  blockOfElements.prepend(createCard(inputTypeTitle.value, inputTypeLink.value));
  formNewPlace.reset();
  buttonNewPlaceSubmit.classList.add('popup__button-save_disabled');
  buttonNewPlaceSubmit.disabled = true;
  hidePopup(popupNewPlace);
}

createInitialCards(initialCards);
formProfile.addEventListener('submit', handleProfileFormSubmit);
formNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);
buttonAddNewPlace.addEventListener('click', () => showPopup(popupNewPlace));
buttonEditProfile.addEventListener('click', () => showProfilePopup(popupProfile));

buttonsClosePopup.forEach((button) => {
  const popup = button.closest('.popup');

  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) hidePopup(popup);
  });

  button.addEventListener('click', () => hidePopup(popup));
});
