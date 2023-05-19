export class FormValidator {
  constructor(enableValidationConfig, formElement) {
    this._formSelector = enableValidationConfig.formSelector;
    this._inputSelector = enableValidationConfig.inputSelector;
    this._submitButtonSelector = enableValidationConfig.submitButtonSelector;
    this._inactiveButtonClass = enableValidationConfig.inactiveButtonClass;
    this._inputErrorClass = enableValidationConfig.inputErrorClass;
    this._errorClass = enableValidationConfig.errorClass;
    this._formElement = formElement;
  }


_setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
  const buttonElement = formElement.querySelector(this._submitButtonSelector);
  this._toggleButtonValidity(inputList, buttonElement);                                              //Вызов функцию toggleButtonState с передачей в нее массива найденных полей ввода и кнопки.
  inputList.forEach((inputElement) => {
      inputElement.addEventListener("input",  () => {                                          //Подключаем обработчик события input для поля ввода.
        this._toggleButtonValidity(inputList, buttonElement);
        this._checkInputValidity(formElement, inputElement);                                      //Вызов функции checkInputValidity с передачей в нее группы полей, где  возникло событие input.
      });
  });
}


_toggleButtonValidity(inputList, buttonElement) {
  if (this._hasInvalidInput(inputList)) {                                                         //Вызов функции hasInvalidInput с передачей массива полей ввода.
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute("disabled", true);
  }
}


_checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {                                                             //Проверка валидации значений содержащ. в поле ввода inputElement
    this._showErrorMessage(formElement, inputElement, inputElement.validationMessage);
  } else {
    this._hideErrorMessage(formElement, inputElement);
  }
}


_hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {                                                      //Для перебора значений массива используем функцию some(). Если одно из полей неккоретно, то функция вернет истину, иначе ложь.
    return !inputElement.validity.valid;
  });
}




_showErrorMessage(formElement, inputElement, errorElementMessage)  {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);                 //Группа полей с классом, которая содержит идентификатор поля и -error
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorElementMessage;
  errorElement.classList.add(this._errorClass);
};



_hideErrorMessage(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = "";
};


enableValidation() {
  const formElement = this._formElement;
  this._setEventListeners(formElement);
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

};


export const enableValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__text_type_invalid",
  errorClass: "popup__error-message",
};



//export default FormValidator;
