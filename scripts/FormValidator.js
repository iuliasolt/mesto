export class FormValidator {
  constructor(enableValidationConfig, formElement) {
    this._formSelector = enableValidationConfig.formSelector;
    this._inputSelector = enableValidationConfig.inputSelector;
    this._submitButtonSelector = enableValidationConfig.submitButtonSelector;
    this._inactiveButtonClass = enableValidationConfig.inactiveButtonClass;
    this._inputErrorClass = enableValidationConfig.inputErrorClass;
    this._errorClass = enableValidationConfig.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(enableValidationConfig.inputSelector));
    this._buttonElement = this._formElement.querySelector(enableValidationConfig.submitButtonSelector);
  }


_setEventListeners() {
  this.toggleButtonValidity();                                                                       //Вызов функцию toggleButtonState с передачей в нее массива найденных полей ввода и кнопки.
  this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input",  () => {                                               //Подключаем обработчик события input для поля ввода.
        this.toggleButtonValidity();
        this._checkInputValidity(inputElement);                                                     //Вызов функции checkInputValidity с передачей в нее группы полей, где  возникло событие input.
      });
  });
}


_checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {                                                                //Проверка валидации значений содержащ. в поле ввода inputElement
    this._showErrorMessage(inputElement, inputElement.validationMessage);
  } else {
    this._hideErrorMessage(inputElement);
  }
}


_hasInvalidInput() {
  return this._inputList.some((inputElement) => {                                                    //Для перебора значений массива используем функцию some(). Если одно из полей неккоретно, то функция вернет истину, иначе ложь.
    return !inputElement.validity.valid;
  });
}


_showErrorMessage(inputElement, errorElementMessage)  {
  const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);                 //Группа полей с классом, которая содержит идентификатор поля и -error
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorElementMessage;
  errorElement.classList.add(this._errorClass);
};


_hideErrorMessage(inputElement) {
  const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = "";
};

toggleButtonValidity() {
  if (this._hasInvalidInput()) {                                                                   //Вызов функции hasInvalidInput с передачей массива полей ввода.
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  } else {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled", true);
  }
};

enableValidation() {
  /*const formElement = this._formElement;
  this._setEventListeners(formElement);*/
  this._formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    });

  this._setEventListeners();
  }

}


export const enableValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__text_type_invalid",
  errorClass: "popup__error-message",
};



//export default FormValidator;
