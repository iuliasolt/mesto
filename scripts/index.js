const edit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup_type_more-info');
const close = popup.querySelector('.popup__close');
const nameEdit = popup.querySelector('.popup__input_type_name');
const jobEdit = popup.querySelector('.popup__input_type_job');
const changeName = document.querySelector('.profile__name');
const changeJob = document.querySelector('.profile__job');
const form = popup.querySelector('.popup__form');

edit.addEventListener('click', () => {
    popup.classList.add('popup_opened'); /*Открытие попапа по клику кнопки edit-button*/
    nameEdit.value = changeName.textContent; /*Предзаполненяем значение input в форме. Сохраняет значение в попапе при открытии.*/
    jobEdit.value = changeJob.textContent;
});

close.addEventListener('click', () => {
    popup.classList.remove("popup_opened"); /*Закрытие попапа по клику на кнопку close*/
});

/*Обработчик submit*/
form.addEventListener('submit', (event) => {
    event.preventDefault(); /*event - чтобы страница не перезагружалась*/

    changeName.textContent = nameEdit.value;
    changeJob.textContent = jobEdit.value;
    popup.classList.remove('popup_opened'); /*Закрытие попапа после внесенных изменений*/
});
