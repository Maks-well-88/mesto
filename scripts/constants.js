export const selectors = {
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
  inputSelector: '.popup__input-field',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: '.popup__input-error',
};

export const popupImage = document.querySelector('.popup_type_image');
export const imageTitle = popupImage.querySelector('.popup__image-title');
export const imageInPopup = popupImage.querySelector(selectors.imagePopupImage);
export const blockOfElements = document.querySelector(selectors.block);
export const popupProfile = document.querySelector(selectors.popupProfile);
export const popupNewPlace = document.querySelector(selectors.popupNewPlace);
export const buttonAddNewPlace = document.querySelector(selectors.buttonAddNewPlace);
export const buttonEditProfile = document.querySelector(selectors.buttonEditProfile);
export const buttonsClosePopup = document.querySelectorAll(selectors.buttonClosePopup);
export const formProfile = popupProfile.querySelector(selectors.popupForm);
export const formNewPlace = popupNewPlace.querySelector(selectors.popupForm);
export const buttonNewPlaceSubmit = formNewPlace.querySelector(selectors.buttonFormSubmit);
export const inputTypeName = formProfile.querySelector(selectors.inputTypeName);
export const inputTypeJob = formProfile.querySelector(selectors.inputTypeJob);
export const inputTypeTitle = formNewPlace.querySelector(selectors.inputTypeTitle);
export const inputTypeLink = formNewPlace.querySelector(selectors.inputTypeLink);
export const profileName = document.querySelector(selectors.profileName);
export const profileJob = document.querySelector(selectors.profileJob);
export const forms = document.querySelectorAll(selectors.popupForm);
