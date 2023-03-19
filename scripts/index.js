const edit = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup_type_more-info");
const close = popup.querySelector(".popup__close");
const nameEdit = popup.querySelector(".popup__name");
const jobEdit = popup.querySelector(".popup__job");
const changeName = document.querySelector(".profile__name");
const changeJob = document.querySelector(".profile__job");
const save = popup.querySelector(".popup__save");
const form = popup.querySelector(".popup__form");

edit.addEventListener("click", () => {
    console.log("click");

popup.classList.add("popup_opened")
});

close.addEventListener("click", () => {
    popup.classList.remove("popup_opened")
});



form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameEdit.value;
    const job = jobEdit.value;

    changeName.textContent = name;
    changeJob.textContent = job;
});
