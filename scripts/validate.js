const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-field',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: '.popup__input-error',
};

const enableValidation = (object) => {
  const forms = document.querySelectorAll(object.formSelector);
  forms.forEach((form) => form.addEventListener('input', handleInputValidation));

  function handleInputValidation(event) {
    const input = event.target;
    const form = input.closest(object.formSelector);
    showInputError(input, form);
    activateSubmitButton(form);
  }
};

function showInputError(input, form) {
  const invalid = !input.validity.valid;
  const errorField = form.querySelector(`.${input.id}-error`);
  errorField.textContent = input.validationMessage;
  input.classList.toggle(object.inputErrorClass, invalid);
}

function activateSubmitButton(form) {
  const button = form.querySelector(object.submitButtonSelector);
  const invalid = !form.checkValidity();
  button.disabled = invalid;
  button.classList.toggle(object.inactiveButtonClass, invalid);
}

function resetErrors(popup) {
  const form = popup.querySelector(object.formSelector);
  const button = form.querySelector(object.submitButtonSelector);
  const inputs = form.querySelectorAll(object.inputSelector);
  inputs.forEach((input) => {
    input.classList.remove(object.inputErrorClass);
    form.querySelector(`.${input.id}-error`).textContent = '';
  });

  button.disabled = false;
  button.classList.remove(object.inactiveButtonClass);
}

enableValidation(object);
