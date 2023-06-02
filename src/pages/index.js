import "./index.css";
import { enableValidationConfig, initialCards } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const popupProfile = document.querySelector(".popup_type_more-info");
const popupCardAdd = document.querySelector(".popup_type_card-add");
const nameEdit = document.querySelector(".popup__text_type_name");
const jobEdit = document.querySelector(".popup__text_type_job");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const cardGallery = document.querySelector(".cards");
const formAddCard = document.querySelector(".popup__form_type_add");
const formProfile = document.querySelector(".popup__form_type_profile");
const nameInput = formAddCard.querySelector(".popup__text_type_title");
const linkInput = formAddCard.querySelector(".popup__text_type_link");

const popupPhoto = new PopupWithImage(".popup_type_image");

const userInfo = new UserInfo({
    changeName: ".profile__name",
    changeJob: ".profile__job",
});


function createCardElement(cardData) {
    const card = new Card(
        {
            data: cardData,
            handleCardClick: (link, name) => {
                popupPhoto.open({ link, name });
            },
        },
        "#card-template"
    );
    const cardElement = card.generate();
    return cardElement;
}

/*Массив отображение карточек*/
const section = new Section(
    {
        items: initialCards,
        renderer: renderCard,
    },
    cardGallery
);

function renderCard(cardData) {
    const cardElement = createCardElement(cardData);
    section.addItem(cardElement);
}
section.rendererItems(initialCards);

const popupEditProfile = new PopupWithForm(".popup_type_more-info", {
    submitForm: (data) => {
        userInfo.setUserInfo(data);
    },
});

/*Открытие карточек*/
const popupAddCard = new PopupWithForm(".popup_type_card-add", {
    submitForm: (formValues) => {
        section.addItem(
            createCardElement({
                name: formValues.username,
                link: formValues.description,
            })
        );
    },
});

/*Кнопка редактирования профиля edit-button*/
buttonEditProfile.addEventListener("click", () => {
    const data = userInfo.getUserInfo();
    nameEdit.value = data.userName;
    jobEdit.value = data.userInfo;
    popupEditProfile.open();
});


/*Открытие popup'а - кнопка "добавить"*/
buttonAdd.addEventListener("click", () => {
    addCardValidator.toggleButtonValidity();
    popupAddCard.open();
});

/*Включение валидации*/
const profileValidator = new FormValidator(enableValidationConfig, formProfile);
const addCardValidator = new FormValidator(enableValidationConfig, formAddCard);

profileValidator.enableValidation();
addCardValidator.enableValidation();
