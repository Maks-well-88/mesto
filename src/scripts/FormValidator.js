class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors;
    this._form = form;
    this._button = this._form.querySelector(this._selectors.buttonFormSubmit);
    this._inputs = this._form.querySelectorAll(this._selectors.inputSelector);
  }

  _toggleInputError = (input) => {
    const invalid = !input.validity.valid;
    const errorField = this._form.querySelector(`.${input.id}-error`);
    errorField.textContent = input.validationMessage;
    input.classList.toggle(this._selectors.inputErrorClass, invalid);
  };

  _hideInputError = (input) => {
    input.classList.remove(this._selectors.inputErrorClass);
    this._form.querySelector(`.${input.id}-error`).textContent = '';
  };

  _toggleButtonState = () => {
    const invalid = !this._form.checkValidity();
    this._button.disabled = invalid;
    this._button.classList.toggle(this._selectors.inactiveButtonClass, invalid);
  };

  _handleInputValidation = (event) => {
    const input = event.target;
    this._toggleInputError(input);
    this._toggleButtonState();
  };

  resetErrors = () => {
    this._toggleButtonState();
    this._inputs.forEach((input) => this._hideInputError(input));
  };

  enableValidation = () => {
    this._form.addEventListener('input', this._handleInputValidation);
  };
}

export default FormValidator;
