import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, submitForm }) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popupSelector.querySelector(".popup__form");
        this._inputList = Array.from(this._form.querySelectorAll(".popup__text"));
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => (this._formValues[input.name] = input.value));

        return this._formValues;
    }

    setEventListeners() {
        this._popupSelector.addEventListener("submit", () => {
            //evt.preventDefault();
            this._submitForm(this._getInputValues());
            this.close();
        });
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }
}
