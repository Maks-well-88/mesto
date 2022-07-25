const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input-field_type_error',
};

const enableValidation = (object) => {
  const forms = document.querySelectorAll(object.formSelector);
  forms.forEach((form) => form.addEventListener('input', handleInputValidation));

  function handleInputValidation(event) {
    const input = event.target;
    const form = input.closest(object.formSelector);
    showInputError(input);
    activateSubmitButton(form);
  }

  function showInputError(input) {
    const valid = input.validity.valid;
    const errorField = input.nextElementSibling;
    errorField.textContent = input.validationMessage;
    !valid ? input.classList.add(object.inputErrorClass) : input.classList.remove(object.inputErrorClass);
  }

  function activateSubmitButton(form) {
    const button = form.querySelector(object.submitButtonSelector);

    if (form.checkValidity()) {
      button.removeAttribute('disabled');
      button.classList.remove(object.inactiveButtonClass);
    } else {
      button.setAttribute('disabled', 'true');
      button.classList.add(object.inactiveButtonClass);
    }
  }
};

enableValidation(object);
