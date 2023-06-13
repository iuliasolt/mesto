import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { submitForm }) {
        super(popupSelector);
        this._form = this._popup.querySelector(".popup__form");
        this._submitForm = submitForm;
        this._inputList = Array.from(this._popup.querySelectorAll(".popup__text"));
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
          this._formValues[input.name] = input.value;
        })
        return this._formValues;
    }

    close() {
      super.close();
      this._form.reset();
      
  }

    setEventListeners() {
      super.setEventListeners();
        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
            //this.close();
        });
        
    }

    
}
