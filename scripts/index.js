import { Card }  from  "./Card.js";
import { FormValidator, enableValidationConfig }  from "./FormValidator.js";

const initialCards = [
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


const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_more-info");
//const popupProfileSave = popupProfile.querySelector(".popup__save");
const buttonClose = document.querySelector(".popup__close");
const nameEdit = document.querySelector(".popup__text_type_name");
const jobEdit = document.querySelector(".popup__text_type_job");
const changeName = document.querySelector(".profile__name");
const changeJob = document.querySelector(".profile__job");
const formProfile = document.querySelector(".popup__form_type_profile");
const cardGallery = document.querySelector(".cards");
const popupCardAdd = document.querySelector(".popup_type_card-add");
const buttonAdd = document.querySelector(".profile__add-button");
const formAddCard = document.querySelector(".popup__form_type_add");
const cardCloseAdd = document.querySelector(".popup__close_type_add");
const addCardButtonSave = popupCardAdd.querySelector(".popup__save");
//const popupText = document.querySelector(".popup__text");
const imageClose = document.querySelector(".popup__close_image");
const nameInput = formAddCard.querySelector(".popup__text_type_title");
const linkInput = formAddCard.querySelector(".popup__text_type_link");
export const cardTemplate = document.getElementById("card-template");
export const popupPhoto = document.querySelector(".popup_type_image");
export const popupImage = document.querySelector(".popup__image");
export const popupParagraph = document.querySelector(".popup__paragraph");

/*Функция открытия popup'ов*/
export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscape)
};
/*Функция закрытия popup'ов*/
export const closePopup = (popup) => {
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

/*popupCardAdd.addEventListener("click", handleOverlay);
popupProfile.addEventListener("click", handleOverlay);
popupPhoto.addEventListener("click", handleOverlay);*/

document.querySelectorAll('.popup').forEach( popup => {
  popup.addEventListener('mousedown',  handleOverlay );
});

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
    //addCardButtonSave.classList.add('popup__save_disabled')
    addCardValidator.toggleButtonValidity();
   // addCardButtonSave.disabled = true;
};


cardCloseAdd.addEventListener("click", () => {
  closePopup(popupCardAdd);
});


/*Кнопка добавления новой карточки*/
formAddCard.addEventListener("submit", handleAddCardSubmit);


function createCardElement(cardData) {
  const card = new Card(cardData, ".card-template");
  const cardElement = card.generate();
  return cardElement;
}

/*Включение валидации*/
const profileValidator = new FormValidator(enableValidationConfig, formProfile);
const addCardValidator = new FormValidator(enableValidationConfig, formAddCard);

profileValidator.enableValidation();
addCardValidator.enableValidation();
