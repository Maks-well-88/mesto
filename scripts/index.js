const initialCards = [
  {
    name: 'Сочи',
    link: '../images/dima-fedorov-sochi.jpg'
  },
  {
    name: 'Ялта',
    link: '../images/dmitry-bogatyrev-yalta.jpg'
  },
  {
    name: 'Домбай',
    link: '../images/kirill-pershin-dombai.jpg'
  },
  {
    name: 'Эльбрус',
    link: '../images/kirill-pershin-elbrus.jpg'
  },
  {
    name: 'Карачаевск',
    link: '../images/kirill-pershin-karachaevsk.jpg'
  },
  {
    name: 'Алтай',
    link: '../images/sergei-wing-altay.jpg'
  },
];

const selectors = {
  block: '.elements',
  card: '.element',
  template: '.card-template',
  image: '.element__image',
  title: '.element__title'
}

const blockOfElements = document.querySelector(selectors.block);

//  initial cards creation function
function createInitialCards(initialCards) {
  initialCards.forEach(item => {
    const card = document.querySelector(selectors.template).content.querySelector(selectors.card).cloneNode(true);
    card.querySelector(selectors.title).textContent = item.name;
    card.querySelector(selectors.image).src = item.link;
    card.querySelector(selectors.image).alt = item.name;
    blockOfElements.appendChild(card); 
  });
}

// function calls
createInitialCards(initialCards);

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
