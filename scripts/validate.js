const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));                          //Получаем перечень всех элементов группы полей с классом popup__text.
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonValidity(inputList, buttonElement, rest);                                              //Вызов функцию toggleButtonState с передачей в нее массива найденных полей ввода и кнопки.
  inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {                                          //Подключаем обработчик события input для поля ввода.
          toggleButtonValidity(inputList, buttonElement, rest);
          checkInputValidity(formElement, inputElement, rest);                                      //Вызов функции checkInputValidity с передачей в нее группы полей, где  возникло событие input.
      });
  });
};

const toggleButtonValidity = (inputList, buttonElement, {inactiveButtonClass, ...rest}) => {
  if (hasInvalidInput(inputList, rest)) {                                                         //Вызов функции hasInvalidInput с передачей массива полей ввода.
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
  } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute("disabled", true);
  }
};

const checkInputValidity = (formElement, inputElement, { ...rest }) => {
  if (!inputElement.validity.valid) {                                                             //Проверка валидации значений содержащ. в поле ввода inputElement
      showErrorMessage(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
      hideErrorMessage(formElement, inputElement, rest);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {                                                      //Для перебора значений массива используем функцию some(). Если одно из полей неккоретно, то функция вернет истину, иначе ложь.
      return !inputElement.validity.valid;
  });
};

const showErrorMessage = (formElement, inputElement, errorElementMessage, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);                 //Группа полей с классом, которая содержит идентификатор поля и -error
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorElementMessage;
  errorElement.classList.add(errorClass);
};

const hideErrorMessage = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const enableValidation = ({formSelector, ...rest}) => {
  const form = Array.from(document.querySelectorAll(formSelector));                           //Получаем перечень всех элементов документа с классом .popup__form.
  form.forEach((formElement) => {                                                             //Перебираем все найденные формы.
      setEventListeners(formElement, rest);
      formElement.addEventListener("submit", function (evt) {
          evt.preventDefault();
      });
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__text_type_invalid",
  errorClass: "popup__error-message",
});
