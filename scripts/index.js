const initialCards = [
  {
    name: 'Сочи',
    link: '../images/dima-fedorov-sochi.jpg',
  },
  {
    name: 'Ялта',
    link: '../images/dmitry-bogatyrev-yalta.jpg',
  },
  {
    name: 'Домбай',
    link: '../images/kirill-pershin-dombai.jpg',
  },
  {
    name: 'Эльбрус',
    link: '../images/kirill-pershin-elbrus.jpg',
  },
  {
    name: 'Карачаевск',
    link: '../images/kirill-pershin-karachaevsk.jpg',
  },
  {
    name: 'Алтай',
    link: '../images/sergei-wing-altay.jpg',
  },
];

const selectors = {
  block: '.elements',
  card: '.element',
  template: '.card-template',
  image: '.element__image',
  title: '.element__title',
  buttonAddNewPlace: '.profile__add-button',
  buttonEditProfile: '.profile__edit-button',
  buttonClosePopup: '.popup__close',
  popupProfile: '.popup',
  popupNewPlace: '.popup_type_new-place',
  popupForm: '.popup__form',
  inputTypeName: '.popup__input-field_type_name',
  inputTypeJob: '.popup__input-field_type_job',
  profileName: '.profile__name',
  profileJob: '.profile__job',
};

const blockOfElements = document.querySelector(selectors.block);
const popupProfile = document.querySelector(selectors.popupProfile);
const popupNewPlace = document.querySelector(selectors.popupNewPlace);
const buttonAddNewPlace = document.querySelector(selectors.buttonAddNewPlace);
const buttonEditProfile = document.querySelector(selectors.buttonEditProfile);
const buttonCloseProfilePopup = document.querySelector(selectors.buttonClosePopup);
const buttonClosePlacePopup = popupNewPlace.querySelector(selectors.buttonClosePopup);
const formProfile = popupProfile.querySelector(selectors.popupForm);
let inputTypeName = formProfile.querySelector(selectors.inputTypeName);
let inputTypeJob = formProfile.querySelector(selectors.inputTypeJob);
let profileName = document.querySelector(selectors.profileName);
let profileJob = document.querySelector(selectors.profileJob);

// popup show function
function showPopup(popup) {
  popup.classList.add('popup_opened');
  if (inputTypeName) {
    inputTypeName.value = profileName.textContent;
    inputTypeJob.value = profileJob.textContent;
  }
}

// popup hide function
function hidePopup(popup) {
  popup.classList.remove('popup_opened');
}

//  initial cards creation function
function createInitialCards(initialCards) {
  initialCards.forEach((item) => {
    const card = document.querySelector(selectors.template).content.querySelector(selectors.card).cloneNode(true);
    card.querySelector(selectors.title).textContent = item.name;
    card.querySelector(selectors.image).src = item.link;
    card.querySelector(selectors.image).alt = item.name;
    blockOfElements.appendChild(card);
  });
}

// handler for edit profile form
function formProfileSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = inputTypeName.value;
  profileJob.textContent = inputTypeJob.value;
  hidePopup(popupProfile);
}

// functions calls
createInitialCards(initialCards);

// events listeners
buttonAddNewPlace.addEventListener('click', () => showPopup(popupNewPlace));
buttonEditProfile.addEventListener('click', () => showPopup(popupProfile));
buttonCloseProfilePopup.addEventListener('click', () => hidePopup(popupProfile));
buttonClosePlacePopup.addEventListener('click', () => hidePopup(popupNewPlace));
formProfile.addEventListener('submit', formProfileSubmitHandler);
