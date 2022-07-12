const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const profileEditButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close');
const popupProfile = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
let inputName = formElement.querySelector('.popup__input-field_type_name');
let inputJob = formElement.querySelector('.popup__input-field_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function showPopup() {
  popupProfile.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}
function hidePopup() {
  popupProfile.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  hidePopup();
}

profileEditButton.addEventListener('click', showPopup);
closePopupButton.addEventListener('click', hidePopup);
formElement.addEventListener('submit', formSubmitHandler);
