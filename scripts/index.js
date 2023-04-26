const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_more-info");
const buttonClose = document.querySelector(".popup__close");
const nameEdit = document.querySelector(".popup__text_type_name");
const jobEdit = document.querySelector(".popup__text_type_job");
const changeName = document.querySelector(".profile__name");
const changeJob = document.querySelector(".profile__job");
const formProfile = document.querySelector(".popup__form_type_profile");
const cardTemplate = document.getElementById("card-template");
const cardGallery = document.querySelector(".cards");
const popupCardAdd = document.querySelector(".popup_type_card-add");
const buttonAdd = document.querySelector(".profile__add-button");
const formAddCard = document.querySelector(".popup__form_type_add");
const cardCloseAdd = document.querySelector(".popup__close_type_add");
const popupPhoto = document.querySelector(".popup_type_image");
const popupText = document.querySelector(".popup__text");
const popupImage = document.querySelector(".popup__image");
const popupParagraph = document.querySelector(".popup__paragraph");
const imageClose = document.querySelector(".popup__close_image");
const nameInput = formAddCard.querySelector(".popup__text_type_title");
const linkInput = formAddCard.querySelector(".popup__text_type_link");

/*Функция открытия popup'ов*/
const openPopup = (popup) => {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscape)
};

/*Функция закрытия popup'ов*/
const closePopup = (popup) => {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscape)
};

/*Закртытие popup'ов* на Esc*/
function handleEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector(".popup_opened"));
  }
}

/*Закрытие на overlay*/
function handleOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

popupCardAdd.addEventListener("click", handleOverlay);
popupProfile.addEventListener("click", handleOverlay);
popupPhoto.addEventListener("click", handleOverlay);

/*Кнопка редактирования профиля edit-button*/
buttonEditProfile.addEventListener("click", () => {
    openPopup(popupProfile);
    nameEdit.value = changeName.textContent; /*Предзаполненяем значение input в форме. Сохраняет значение в попапе при открытии.*/
    jobEdit.value = changeJob.textContent;
});

buttonClose.addEventListener("click", () => {
    closePopup(popupProfile); /*Закрытие попапа по клику на кнопку close*/
});

/*Обработчик submit*/
formProfile.addEventListener("submit", (event) => {
    event.preventDefault(); /*event - чтобы страница не перезагружалась*/

    changeName.textContent = nameEdit.value;
    changeJob.textContent = jobEdit.value;
    closePopup(popupProfile);
});

/*Открытие popup'а - кнопка "добавить"*/
buttonAdd.addEventListener("click", () => {
    openPopup(popupCardAdd);
});

/*Закрытие картинки*/
imageClose.addEventListener("click", () => {
    closePopup(popupPhoto);
});

/*Функция создания элементов на основе данных о карточках*/
const createCardElement = (cardData) => {
    const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);

    const cardName = cardElement.querySelector(".card__name");
    const cardImage = cardElement.querySelector(".card__image");

    cardName.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    /*Открытие картинки*/
    cardImage.addEventListener("click", () => {
        openPopup(popupPhoto);
        popupImage.setAttribute("src", cardImage.src);
        popupImage.alt = cardName.textContent;
        popupParagraph.textContent = cardName.textContent;
    });

    const trashButton = cardElement.querySelector(".card__trash");
    const likeButton = cardElement.querySelector(".card__like");

    /*Удаление карточки*/
    trashButton.addEventListener("click", () => {
        cardElement.remove();
    });

    /*Лайк на карточку*/
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("card__like_active");
    });

    return cardElement;
};

const renderCardElement = (cardElement) => {
    cardGallery.prepend(cardElement); /*Добавление карточки в начало секции*/
};

/*Перебор массива*/
initialCards.forEach((card) => {
    renderCardElement(createCardElement(card));
});

/*Добавление новых карточек*/
const handleAddCardSubmit = (event) => {
    event.preventDefault();

    const name = nameInput.value;
    const link = linkInput.value;

    const cardData = {
        name,
        link,
    };

    renderCardElement(createCardElement(cardData));
    closePopup(popupCardAdd);
    formAddCard.reset();
};

cardCloseAdd.addEventListener("click", () => {
    closePopup(popupCardAdd);
});

/*Кнопка добавления новой карточки*/
formAddCard.addEventListener("submit", handleAddCardSubmit);


