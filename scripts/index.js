let editButton = document.querySelector(".main__button_edit");
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__button_close");
let form = document.querySelector(".popup__container");
let inName = document.querySelector(".main__paragraph_name");
let inAbout = document.querySelector(".main__paragraph_role");
let inpName = document.querySelector(".popup__input_name");
let inpAbout = document.querySelector(".popup__input_about");
let saveButton = document.querySelector(".popup__button_save");

function openEditEmpty() {
  inpName.value = "";
  inpAbout.value = "";
  saveButton.disabled = true;
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function openEdit() {
  inpName.value = "";
  inpAbout.value = "";
  validateInputs();

  popup.classList.toggle("popup_opened");
}
function validateInputs() {
  const isNameValid = inpName.value.trim() !== "";
  const isAboutValid = inpAbout.value.trim() !== "";
  saveButton.disabled = !(isNameValid && isAboutValid);
}
inpName.addEventListener("input", validateInputs);
inpAbout.addEventListener("input", validateInputs);
editButton.addEventListener("click", openEdit);
closeButton.addEventListener("click", openEdit);

function saveChange(e) {
  e.preventDefault();
  inName.textContent = inpName.value;
  inAbout.textContent = inpAbout.value;
  openEdit();
}

form.addEventListener("submit", saveChange);
