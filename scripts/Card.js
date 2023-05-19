export const initialCards = [
  {
    name: 'Токио',
    link: 'https://images.unsplash.com/photo-1679458118229-6ac5b35757d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Бали',
    link: 'https://images.unsplash.com/photo-1676995278388-6e899b1d5fab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Пулга',
    link: 'https://images.unsplash.com/photo-1677241817906-a84211b4f627?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  },
  {
    name: 'Татры',
    link: 'https://images.unsplash.com/photo-1677098077185-5438068c2ae6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Этна',
    link: 'https://images.unsplash.com/photo-1675860782897-3039871bd39c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Пуант Де Шато',
    link: 'https://images.unsplash.com/photo-1673957216012-120e1397db41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  }
]

import { openPopup, closePopup } from "./index.js";

const popupPhoto = document.querySelector(".popup_type_image");
///const popupText = document.querySelector(".popup__text");
const popupImage = document.querySelector(".popup__image");
const popupParagraph = document.querySelector(".popup__paragraph");
//const imageClose = document.querySelector(".popup__close_image");
const cardTemplate = document.getElementById("card-template")


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
  this._cardImage = this._card.querySelector(".card__image");
  this._imageClose = document.querySelector(".popup__close_image");

  this._cardImage.addEventListener("click", () => {
    this._handleOpenPopup();
  });

  this._trashButton.addEventListener("click", () => {
    this._removeCard();
  });

  this._likeButton.addEventListener("click", () => {
    this._toggleLikeButton();
  });

  this._imageClose.addEventListener("click", () => {
    this._handleClosePopup();
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
  this._setEventListeners();


  this._card.querySelector(".card__image").src = this._image;
  this._card.querySelector(".card__name").textContent = this._name;
  this._card.querySelector(".card__image").alt = this._name;
  return this._card;
  }
}

//export default Card;
