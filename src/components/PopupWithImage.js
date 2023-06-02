import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector(".popup__image");
        this._popupParagraph = this._popup.querySelector(".popup__paragraph");
    }

    open(data) {
        super.open();
        this._popupImage.src = data.link;
        this._popupParagraph.textContent = data.name;
        this._popupImage.alt = data.name;
        super.open();
    }
}
