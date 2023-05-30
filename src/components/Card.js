//import {/*popupPhoto,*/ /*popupImage, popupParagraph,*/ cardTemplate } from "./index.js";
const cardTemplate = document.getElementById("card-template");

export default class Card {
    constructor({ data, handleCardClick }, template) {
        this._template = template;
        this._image = data.link;
        this._name = data.name;
        this._handleCardClick = handleCardClick;
    }

    _setEventListeners() {
        this._likeButton = this._card.querySelector(".card__like");
        this._trashButton = this._card.querySelector(".card__trash");
        //this._cardImage = this._card.querySelector(".card__image");

        this._cardImage.addEventListener("click", () => {
            this._handleCardClick(this._image, this._name);
        });

        this._trashButton.addEventListener("click", () => {
            this._removeCard();
        });

        this._likeButton.addEventListener("click", () => {
            this._toggleLikeButton();
        });
    }

    _removeCard() {
        this._card.remove();
    }

    _toggleLikeButton() {
        this._likeButton.classList.toggle("card__like_active");
    }

    _getTemplate() {
        // забираем разметку из HTML и клонируем элемент
        const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
        // вернём DOM-элемент карточки

        return cardElement;
    }

    generate() {
        this._card = this._getTemplate();
        this._cardImage = this._card.querySelector(".card__image");
        this._cardName = this._card.querySelector(".card__name");

        this._cardImage.src = this._image;
        this._cardName.textContent = this._name;
        this._cardImage.alt = this._name;

        this._setEventListeners();
        return this._card;
    }
}
