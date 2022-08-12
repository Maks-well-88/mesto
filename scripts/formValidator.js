export class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors;
    this._form = form;
  }

  _showInputError = (input, form) => {
    const invalid = !input.validity.valid;
    const errorField = form.querySelector(`.${input.id}-error`);
    errorField.textContent = input.validationMessage;
    input.classList.toggle(this._selectors.inputErrorClass, invalid);
  };

  _activateSubmitButton = (form) => {
    const button = form.querySelector(this._selectors.buttonFormSubmit);
    const invalid = !form.checkValidity();
    button.disabled = invalid;
    button.classList.toggle(this._selectors.inactiveButtonClass, invalid);
  };

  _handleInputValidation = (event) => {
    const input = event.target;
    this._showInputError(input, this._form);
    this._activateSubmitButton(this._form);
  };

  resetErrors = (popup) => {
    const button = this._form.querySelector(this._selectors.buttonFormSubmit);
    const inputs = this._form.querySelectorAll(this._selectors.inputSelector);
    button.disabled = false;
    button.classList.remove(this._selectors.inactiveButtonClass);
    inputs.forEach((input) => {
      input.classList.remove(this._selectors.inputErrorClass);
      this._form.querySelector(`.${input.id}-error`).textContent = '';
    });
  };

  enableValidation = () => {
    this._form.addEventListener('input', this._handleInputValidation);
  };
}
