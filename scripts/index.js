const profileEditButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close');
const popupProfile = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
let inputName = formElement.querySelector('.popup__input-field_type_name');
let  inputJob = formElement.querySelector('.popup__input-field_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function showPopup() {
  popupProfile.classList.add('popup_opened');
  inputName.setAttribute('value', profileName.textContent);
  inputJob.setAttribute('value', profileJob.textContent);
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