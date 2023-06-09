import "./index.css";
import { profileEditAvatar, popupProfile, popupCardAdd, nameEdit, jobEdit, buttonEditProfile, buttonAdd, cardGallery, formAddCard, formProfile, nameInput, linkInput, popupAvatar, enableValidationConfig } from "../utils/constants";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";

let userId = null;
const popupPhoto = new PopupWithImage(".popup_type_image");

/*Загрузка информации о пользователе с сервера*/
const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-68",
    headers: {
        authorization: "0b764e67-5e2a-419b-ae24-cb0da79c917b",
        "Content-Type": "application/json",
    },
});

/*Рендер и отображение карточек на странице*/
Promise.all([api.getDataUser(), api.getInitialCards()])
    .then((data) => {
        // обрабатываем результат
        userId = data[0]._id;
        userInfo.setUserInfo(data[0]);

        const cardReserve = data[1].reverse();

        section.rendererItems(cardReserve);
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });

/*Удаление карточек*/
const popupWithConfirmation = new PopupWithConfirmation(".popup_type_delete-card", {
    deleteCard: (id, card) => {
        popupWithConfirmation.renderLoading(true, "Удаление...");
        api.deleteCard(id)
            .then(() => {
                card.deleteCard();
                popupWithConfirmation.close();
            })
            .catch((err) => {
                console.log(`deleteCard - ${err.status}`);
            })

            .finally(() => {
                popupWithConfirmation.renderLoading(false);
            });
    },
});

/*Функция создания карточки*/
function createCardElement(data) {
    const card = new Card(
        {
            data,
            handleCardClick: (link, name) => {
                popupPhoto.open({ link, name });
            },
            handleDeleteIconClick: (cardId, card) => {
                popupWithConfirmation.open(cardId, card);
            },
            handleLikeClick: (cardId) => {
                api.setLike(cardId)
                    .then((data) => {
                        card.handleLike(data);
                    })
                    .catch((err) => {
                        console.log(`handleLikeClick - ${err.status}`);
                    });
            },
            handleDeleteLikeClick: (cardId) => {
                api.deleteLike(cardId)
                    .then((data) => {
                        card.handleLike(data);
                    })
                    .catch((err) => {
                        console.log(`handleLikeClick - ${err.status}`);
                    });
            },
        },
        "#card-template",
        userId
    );
    const cardElement = card.generate();
    return cardElement;
}

/*Редактирование аватара*/
const popupNewAvatar = new PopupWithForm(".popup_type_avatar", {
    submitForm: (data) => {
        //popupNewAvatar.renderLoading(true, "Загрузка...");
        return api
            .setUserAvatar(data)
            .then((res) => {
                userInfo.setUserInfo(res);
                popupNewAvatar.close();
            })
            .catch((err) => {
                console.log(`setUserAvatar - ошибка: ${err}`);
            })
            .finally(() => {
                popupNewAvatar.renderLoading(false);
            });
    },
});

profileEditAvatar.addEventListener("click", () => {
    avatarValidator.toggleButtonValidity();
    popupNewAvatar.open();
});

/*Массив отображение карточек*/
const section = new Section(renderCard, ".cards");

function renderCard(cardData) {
    const cardElement = createCardElement(cardData);
    section.addItem(cardElement);
}

/*Добавление новых карточек*/
const popupAddCard = new PopupWithForm(".popup_type_card-add", {
    submitForm: (data) => {
        // popupAddCard.renderLoading(true, "Создание...");
        return api
            .addNewCard(data)
            .then((data) => {
                popupAddCard.close();
                section.addItem(createCardElement(data));
            })

            .catch((err) => console.log(`addNewCard - ошибка: ${err}`))
            .finally(() => {
                popupAddCard.renderLoading(false, "Создано");
            });
    },
});

/*Открытие popup'а - кнопка "добавить"*/
buttonAdd.addEventListener("click", () => {
    addCardValidator.toggleButtonValidity();
    popupAddCard.open();
});

const userInfo = new UserInfo({
    changeNameSelector: ".profile__name",
    changeJobSelector: ".profile__job",
    changeAvatarSelector: ".profile__image",
});

/*Редактирование профиля edit-button*/
const popupEditProfile = new PopupWithForm(".popup_type_more-info", {
    submitForm: (data) => {
        //popupEditProfile.renderLoading(true, "Сохранение...");
        return api
            .setUserData(data)
            .then((data) => {
                popupEditProfile.close();
                userInfo.setUserInfo(data);
            })
            .catch((err) => console.log(`setUserData - ошибка: ${err}`))

            .finally(() => {
                popupEditProfile.renderLoading(false, "Сохранено");
            });
    },
});

buttonEditProfile.addEventListener("click", () => {
    //profileValidator.enableValidation();

    popupEditProfile.setInputValues(userInfo.getUserInfo());
    popupEditProfile.open();
});

/*Включение валидации*/
const profileValidator = new FormValidator(enableValidationConfig, formProfile);
const addCardValidator = new FormValidator(enableValidationConfig, formAddCard);
const avatarValidator = new FormValidator(enableValidationConfig, popupAvatar);

profileValidator.enableValidation();
addCardValidator.enableValidation();
avatarValidator.enableValidation();

popupNewAvatar.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupWithConfirmation.setEventListeners();
popupPhoto.setEventListeners();
