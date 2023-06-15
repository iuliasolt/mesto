import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { submitForm }) {
        super(popupSelector);
        this._form = this._popup.querySelector(".popup__form");
        this._submitFormElement = this._popup.querySelector(".popup__save");
        this._submitForm = submitForm;
        this._submitFormText = this._submitFormElement.textContent;
        this._inputList = Array.from(this._popup.querySelectorAll(".popup__text"));
    }

    renderLoading(isLoading, loadingText = "Сохранение...") {
        if (isLoading) {
            this._submitFormElement.textContent = loadingText;
        } else {
            this._submitFormElement.textContent = this._submitFormText;
        }
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    /*Функция наполнения формы input*/
    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const initialText = this._submitFormElement.textContent;
            this._submitFormElement.textContent = "Сохранение...";
            this._submitForm(this._getInputValues())
                .then(() => this.close()) 
                .finally(() => {
                    this._submitFormElement.textContent = initialText;
                });
        });
    }
}
