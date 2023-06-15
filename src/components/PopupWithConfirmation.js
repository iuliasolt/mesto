import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, { deleteCard }) {
        super(popupSelector);
        this._deleteCard = deleteCard;
        this._submitFormElement = this._popup.querySelector(".popup__save");
        this._submitFormText = this._submitFormElement.textContent;
    }
    open(card, cardId) {
        super.open();
        this.card = card;
        this.id = cardId;
    }

    renderLoading(isLoading, loadingText = "Удаление...") {
        if (isLoading) {
            this._submitFormElement.textContent = loadingText;
        } else {
            this._submitFormElement.textContent = this._submitFormText;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitFormElement.addEventListener("click", (evt) => {
            evt.preventDefault();
            this._deleteCard(this.id, this.card);
        });
    }
}
