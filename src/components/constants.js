export const selectors = {
  block: '.elements',
  card: '.element',
  template: '.card-template',
  image: '.element__image',
  buttonDeleteCard: '.element__delete-btn',
  title: '.element__title',
  popup: '.popup',
  buttonAddNewPlace: '.profile__add-button',
  buttonEditProfile: '.profile__edit-button',
  buttonFormSubmit: '.popup__button-save',
  popupProfile: '.popup_type_profile',
  popupNewPlace: '.popup_type_new-place',
  popupImage: '.popup_type_image',
  popupConfirmation: '.popup_type_delete-card',
  popupForm: '.popup__form',
  inputTypeName: '.popup__input-field_type_name',
  inputTypeJob: '.popup__input-field_type_job',
  profileName: '.profile__name',
  profileJob: '.profile__job',
  buttonLikeCard: '.element__like-btn',
  inputSelector: '.popup__input-field',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: '.popup__input-error',
  closeButton: '.popup__close',
  popupImageTitle: '.popup__image-title',
  popupWithImage: '.popup__image',
  avatar: '.profile__avatar-image',
  submitButton: '.popup__button-save_type_confirmation',
  likeCounter: '.element__like-counter',
};

export const popupImage = document.querySelector(selectors.popupImage);
export const blockOfElements = document.querySelector(selectors.block);
export const popupProfile = document.querySelector(selectors.popupProfile);
export const popupNewPlace = document.querySelector(selectors.popupNewPlace);
export const buttonAddNewPlace = document.querySelector(selectors.buttonAddNewPlace);
export const buttonEditProfile = document.querySelector(selectors.buttonEditProfile);
export const formProfile = popupProfile.querySelector(selectors.popupForm);
export const formNewPlace = popupNewPlace.querySelector(selectors.popupForm);
export const inputTypeName = formProfile.querySelector(selectors.inputTypeName);
export const inputTypeJob = formProfile.querySelector(selectors.inputTypeJob);
export const profileName = document.querySelector(selectors.profileName);
export const profileJob = document.querySelector(selectors.profileJob);
export const forms = document.querySelectorAll(selectors.popupForm);
export const avatar = document.querySelector(selectors.avatar);
export const validatorsList = {};
