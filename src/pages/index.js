import "./index.css";
import Card from "../components/Card.js";
import { FormValidator, enableValidationConfig } from "../components/FormValidator.js";
import PopupWithImage  from "../components/PopupWithImage.js";
import  Section  from "../components/Section.js";
import  PopupWithForm  from "../components/PopupWithForm.js";
import  UserInfo  from "../components/UserInfo.js";

const initialCards = [
    {
        name: "Токио",
        link: "https://images.unsplash.com/photo-1679458118229-6ac5b35757d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    {
        name: "Бали",
        link: "https://images.unsplash.com/photo-1676995278388-6e899b1d5fab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    {
        name: "Пулга",
        link: "https://images.unsplash.com/photo-1677241817906-a84211b4f627?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
    },
    {
        name: "Татры",
        link: "https://images.unsplash.com/photo-1677098077185-5438068c2ae6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    {
        name: "Этна",
        link: "https://images.unsplash.com/photo-1675860782897-3039871bd39c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    {
        name: "Пуант Де Шато",
        link: "https://images.unsplash.com/photo-1673957216012-120e1397db41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
];

const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_more-info");
//const popupProfileSave = popupProfile.querySelector(".popup__save");
//const buttonClose = document.querySelector(".popup__close");
const nameEdit = document.querySelector(".popup__text_type_name");
const jobEdit = document.querySelector(".popup__text_type_job");
const changeName = document.querySelector(".profile__name");
const changeJob = document.querySelector(".profile__job");
const formProfile = document.querySelector(".popup__form_type_profile");
const cardGallery = document.querySelector(".cards");
const popupCardAdd = document.querySelector(".popup_type_card-add");
const buttonAdd = document.querySelector(".profile__add-button");
const formAddCard = document.querySelector(".popup__form_type_add");
//const cardCloseAdd = document.querySelector(".popup__close_type_add");
//const addCardButtonSave = popupCardAdd.querySelector(".popup__save");
//const popupText = document.querySelector(".popup__text");
//const imageClose = document.querySelector(".popup__close_image");
const nameInput = formAddCard.querySelector(".popup__text_type_title");
const linkInput = formAddCard.querySelector(".popup__text_type_link");
//export const cardTemplate = document.getElementById("card-template");
const popupPhoto = document.querySelector(".popup_type_image");
//const popupImage = document.querySelector(".popup__image");
//const popupParagraph = document.querySelector(".popup__paragraph");

const userInfo = new UserInfo({
    nameElement: changeName,
    infoElement: changeJob,
});

const popupAddCard = new PopupWithForm({
    popupSelector: popupCardAdd,
    submitForm: () => {
        const data = {
            name: nameInput.value,
            link: linkInput.value,
        };
        section.addItem(createCardElement(data));
    },
});
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm({
    popupSelector: popupProfile,
    submitForm: (data) => {
        userInfo.setUserInfo(data);
    },
});
popupEditProfile.setEventListeners();

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

/*Открытие карточек*/
const popupCard = new PopupWithImage(popupPhoto);
popupCard.setEventListeners();
function createCardElement(cardData) {
    const card = new Card(
        {
            data: cardData,
            handleCardClick: () => {
                popupCard.open(cardData);
            },
        },
        ".card-template"
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

/*Включение валидации*/
const profileValidator = new FormValidator(enableValidationConfig, formProfile);
const addCardValidator = new FormValidator(enableValidationConfig, formAddCard);

profileValidator.enableValidation();
addCardValidator.enableValidation();
