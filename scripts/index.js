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
const buttonAddNewPlace = document.querySelector(selectors.buttonAddNewPlace);
const buttonEditProfile = document.querySelector(selectors.buttonEditProfile);
const buttonsClosePopup = document.querySelectorAll(selectors.buttonClosePopup);
const formProfile = popupProfile.querySelector(selectors.popupForm);
const formNewPlace = popupNewPlace.querySelector(selectors.popupForm);
const inputTypeName = formProfile.querySelector(selectors.inputTypeName);
const inputTypeJob = formProfile.querySelector(selectors.inputTypeJob);
const inputTypeTitle = formNewPlace.querySelector(selectors.inputTypeTitle);
const inputTypeLink = formNewPlace.querySelector(selectors.inputTypeLink);
const profileName = document.querySelector(selectors.profileName);
const profileJob = document.querySelector(selectors.profileJob);

function showPopup(popup) {
  popup.classList.add('popup_opened');
  enableEventsListeners(popup);
}

function hidePopup(popup) {
  popup.classList.remove('popup_opened');
}

function enableEventsListeners(popup) {
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) hidePopup(popup);
  });

  function hidePopupByEsc(event) {
    if (event.key === 'Escape') {
      hidePopup(popup);
      document.removeEventListener('keydown', hidePopupByEsc);
    }
  }

  document.addEventListener('keydown', hidePopupByEsc);
}

function showProfilePopup(popup) {
  showPopup(popup);
  inputTypeName.value = profileName.textContent;
  inputTypeJob.value = profileJob.textContent;
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
  hidePopup(popupNewPlace);
}

createInitialCards(initialCards);
formProfile.addEventListener('submit', handleProfileFormSubmit);
formNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);
buttonAddNewPlace.addEventListener('click', () => showPopup(popupNewPlace));
buttonEditProfile.addEventListener('click', () => showProfilePopup(popupProfile));
buttonsClosePopup.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => hidePopup(popup));
});
