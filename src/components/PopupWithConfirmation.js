import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, { deleteCard }) {
        super(popupSelector);
        this._confirmButton = this._popup.querySelector(".popup__save");
        this.deleteCard = deleteCard;
    }

    setEventListeners() {
        this._popup.addEventListener("click", (evt) => {
            evt.preventDefault();
            this._confirmButton.textContent = "Удаление...";
            this.deleteCard(this.card._cardId);
            this.card.deleteCard();
            this.close();
        });
        super.setEventListeners();
    }

    open(card) {
        this._confirmButton.textContent = "ДА";
        this.card = card;
        super.open();
    }
}
