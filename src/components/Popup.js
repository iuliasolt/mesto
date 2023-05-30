export default class Popup {
  constructor(popupSelector) {
      this._popupSelector = popupSelector;
      this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
      /*Функция открытия popup'ов*/
      this._popupSelector.classList.add("popup_opened");
      document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
      this._popupSelector.classList.remove("popup_opened");
      document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
      if (evt.key === "Escape") {
          this.close();
      }
  };

  setEventListeners() {
      this._buttonClose = this._popupSelector.querySelector(".popup__close");
      this._buttonClose.addEventListener("click", () => {
          this.close();
      });
      this._popupSelector.addEventListener("click", (evt) => {
          if (evt.currentTarget === evt.target) {
              this.close(this._popupSelector);
          }
      });
  }
}
