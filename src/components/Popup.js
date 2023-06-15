export default class Popup {
  constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
      //this.setEventListeners();
     }

  _handleEscClose(evt) {
      if (evt.key === "Escape") {
          this.close();
      }
  }

  open() {
      this._popup.classList.add("popup_opened");
      document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
      this._popup.classList.remove("popup_opened");
      document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
      this._buttonClose = this._popup.querySelector(".popup__close");
      this._buttonClose.addEventListener("click", () => {
          this.close();
      });
      this._popup.addEventListener("click", (evt) => {
          if (evt.currentTarget === evt.target) {
              this.close();
          }
      });
  }
}
