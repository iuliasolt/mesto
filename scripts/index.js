const edit = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupProfile = document.querySelector(".popup_type_more-info");
const close = popup.querySelector(".popup__close");
const nameEdit = popup.querySelector(".popup__text_type_name");
const jobEdit = popup.querySelector(".popup__text_type_job");
const changeName = document.querySelector(".profile__name");
const changeJob = document.querySelector(".profile__job");
const form = popup.querySelector(".popup__form");
const cardTemplate = document.getElementById("card-template");
const cardGrid = document.querySelector(".cards");
const popupCardAdd = document.querySelector(".popup_type_card-add");
const addButton = document.querySelector(".profile__add-button");
const formAddCard = document.querySelector(".popup__form_type_add");
const closeAddCard = document.querySelector(".popup__close_type_add");
const popupImg = document.querySelector(".popup_type_image");
const popupText = document.querySelector(".popup__text");
const popupImage = document.querySelector(".popup__image");
const popupParagraph = document.querySelector(".popup__paragraph");
const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
const cardName = cardElement.querySelector(".card__name");
const cardImage = cardElement.querySelector(".card__image");
const closeImage = document.querySelector(".popup__close_image");

/*Функция открытия popup'ов*/
const openPopup = (popup) => {
    popup.classList.add("popup_opened");
};

/*Функция закрытия popup'ов*/
const closePopup = (popup) => {
    popup.classList.remove("popup_opened");
};

/*Кнопка редактирования профиля edit-button*/
edit.addEventListener("click", () => {
    openPopup(popupProfile);
    nameEdit.value = changeName.textContent; /*Предзаполненяем значение input в форме. Сохраняет значение в попапе при открытии.*/
    jobEdit.value = changeJob.textContent;
});

close.addEventListener("click", () => {
    closePopup(popupProfile);  /*Закрытие попапа по клику на кнопку close*/
});

/*Обработчик submit*/
form.addEventListener("submit", (event) => {
    event.preventDefault(); /*event - чтобы страница не перезагружалась*/

    changeName.textContent = nameEdit.value;
    changeJob.textContent = jobEdit.value;
    closePopup(popupProfile);
});

/*Открытие popup'а - кнопка "добавить"*/
addButton.addEventListener("click", () => {
    openPopup(popupCardAdd);
});

/*Открытие картинки*/
cardImage.addEventListener("click", () => {
    openPopup(popupImg);
    popupImage.setAttribute("src", cardImage.src);
    popupParagraph.textContent = cardName.textContent;
});

/*Закрытие картинки*/
closeImage.addEventListener("click", () => {
    closePopup(popupImg);
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
        openPopup(popupImg);
        popupImage.setAttribute("src", cardImage.src);
        popupParagraph.textContent = cardName.textContent;
    });

    const trashButton = cardElement.querySelector(".card__trash");
    const likeButton = cardElement.querySelector(".card__like");

    /*Удаление картинки*/
    trashButton.addEventListener("click", () => {
        cardElement.remove();
    });

    /*Лайк на картинку*/
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("card__like_active");
    });

    return cardElement;
};

const renderCardElement = (cardElement) => {
    cardGrid.prepend(cardElement); /*Добавление карточки в начало секции*/
};

/*Перебор массива*/
initialCards.forEach((card) => {
    renderCardElement(createCardElement(card));
});

/*Добавление новых карточек*/
const handleAddCardSubmit = (event) => {
    event.preventDefault();

    const nameInput = formAddCard.querySelector(".popup__text_type_title");
    const linkInput = formAddCard.querySelector(".popup__text_type_link");

    const name = nameInput.value;
    const link = linkInput.value;

    const cardData = {
        name,
        link,
    };

    renderCardElement(createCardElement(cardData));
    closePopup(popupCardAdd);
};

closeAddCard.addEventListener("click", () => {
    closePopup(popupCardAdd);
});

/*Кнопка добавления новой карточки*/
formAddCard.addEventListener("submit", handleAddCardSubmit);
