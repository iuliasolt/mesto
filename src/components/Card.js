export default class Card {
  constructor({ data, handleCardClick, handleDeleteLikeClick, handleLikeClick, handleDeleteIconClick }, template, userId) {
      this._template = template;
      this._image = data.link;
      this._name = data.name;
      this._likes = data.likes;
      this._handleCardClick = handleCardClick;
      this._handleDeleteLikeClick = handleDeleteLikeClick;
      this._handleLikeClick = handleLikeClick;
      this._handleDeleteIconClick = handleDeleteIconClick;
      this._cardId = data._id;
      this._userId = userId;
      this._ownerId = data.owner._id;
      this._data = data;
  }

  _getTemplate() {
      // забираем разметку из HTML и клонируем элемент
      const cardElement = document.querySelector(this._template).content.querySelector(".card").cloneNode(true);
      // вернём DOM-элемент карточки

      return cardElement;
  }

  generate() {
      this._card = this._getTemplate();
      this._cardImage = this._card.querySelector(".card__image");
      this._cardName = this._card.querySelector(".card__name");
      this._likeCounter = this._card.querySelector(".card__number-likes");
      this._likeButton = this._card.querySelector(".card__like");
      this._likeCounter = this._card.querySelector(".card__number-likes");
      this._trashButton = this._card.querySelector(".card__trash");

      this._likeCounter.textContent = this._likes.length;
      this._cardImage.src = this._image;
      this._cardName.textContent = this._name;
      this._cardImage.alt = this._name;

      

      this._setEventListeners();
      this._deleteButton();
      this._liked();
      

      return this._card;
  }

  deleteCard = () => {
      this._card.remove();
  };

  _deleteButton() {
      if (this._ownerId !== this._userId) {
          this._trashButton.classList.add("card__trash_hidden");
      }
  }

  handleLike(data) {
      this._likes = data.likes;
      this._likeCounter.textContent = this._likes.length;
      this._likeButton.classList.toggle("card__like_active");
  }

  _liked() {
      this._data.likes.forEach((like) => {
          if (like._id === this._userId) {
              this._likeButton.classList.add("card__like_active");
          }
      });
  }

  _setEventListeners() {
      this._cardImage.addEventListener("click", () => {
          this._handleCardClick(this._image, this._name);
      });

      this._trashButton.addEventListener("click", () => {
          this._handleDeleteIconClick();
      });

      this._likeButton.addEventListener("click", () => {
          if (this._likeButton.classList.contains("card__like_active")) {
              this._handleDeleteLikeClick(this._cardId);
          } else {
              this._handleLikeClick(this._cardId);
          }
      });
  }
}
