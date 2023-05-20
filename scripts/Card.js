import { openPopup, closePopup, popupPhoto, popupImage, popupParagraph, cardTemplate } from "./index.js";

//const popupPhoto = document.querySelector(".popup_type_image");
///const popupText = document.querySelector(".popup__text");
//const popupImage = document.querySelector(".popup__image");
//const popupParagraph = document.querySelector(".popup__paragraph");
//const imageClose = document.querySelector(".popup__close_image");
//const cardTemplate = document.getElementById("card-template")


export class Card {
  constructor(cardData, template) {
    this._template = template;
    this._name = cardData.name;
    this._image = cardData.link;
    this._openPopup = openPopup;
    this._closePopup = closePopup;
  }


_setEventListeners()  {
  this._likeButton = this._card.querySelector(".card__like");
  this._trashButton = this._card.querySelector(".card__trash");
  //this._cardImage = this._card.querySelector(".card__image");
  //this._imageClose = document.querySelector(".popup__close_image");

  this._cardImage.addEventListener("click", () => {
    this._handleOpenPopup();
  });

  this._trashButton.addEventListener("click", () => {
    this._removeCard();
  });

  this._likeButton.addEventListener("click", () => {
    this._toggleLikeButton();
  });

};

_handleOpenPopup() {
  this._openPopup(popupPhoto);
  popupImage.setAttribute("src", this._image);
  popupImage.alt = this._name;
  popupParagraph.textContent = this._name;
}

_removeCard ()  {
  this._card.remove();
}

_toggleLikeButton () {
  this._likeButton.classList.toggle("card__like_active");
};



_handleClosePopup() {
  this._closePopup(popupPhoto);
}

_getTemplate()  {
  // забираем разметку из HTML и клонируем элемент
    const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  // вернём DOM-элемент карточки

   return cardElement;
}


generate() {
  this._card = this._getTemplate();
  this._cardImage = this._card.querySelector(".card__image");
  this._cardName = this._card.querySelector(".card__name")

  this._cardImage.src = this._image;
  this._cardName.textContent = this._name;
  this._cardImage.alt = this._name;


  this._setEventListeners();
  return this._card;
  }
}

//export default Card;
