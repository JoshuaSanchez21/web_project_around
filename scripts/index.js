// scripts/index.js
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openPopup,
  closePopup,
  openImagePopup,
  enableGlobalPopupListeners,
} from "./utils.js";

/* ---------- Configuración y selectores ---------- */
const gallery = document.querySelector(".main__gallery");

// botones y popups perfil
const editButton = document.querySelector(".main__button_edit");
const popupProfile = document.querySelector(".popup_profile");
const closeButtonProfile = popupProfile.querySelector(".popup__button_close");
const formProfile = popupProfile.querySelector(".popup__container.popup__form");
const inName = document.querySelector(".main__paragraph_name");
const inAbout = document.querySelector(".main__paragraph_role");
const inpName = popupProfile.querySelector(".popup__input_name");
const inpAbout = popupProfile.querySelector(".popup__input_about");
const saveButtonProfile = popupProfile.querySelector(".popup__button_save");

// agregar tarjeta
const addButton = document.querySelector(".main__button_add");
const popupAddCard = document.querySelector(".popup_add-card");
const closeButtonAddCard = popupAddCard.querySelector(".popup__button_close");
const formAddCard = popupAddCard.querySelector(".popup__container.popup__form");
const inpNameAddCard = popupAddCard.querySelector(".popup__input_name");
const inpLink = popupAddCard.querySelector(".popup__input_link");
const saveButtonAddCard = popupAddCard.querySelector(".popup__button_save");

// tarjetas iniciales
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

/* ---------- Helpers para popups de perfil y agregar tarjeta ---------- */

function openPopupProfile() {
  // limpiar campos y errores antes de abrir
  inpName.value = "";
  inpAbout.value = "";
  // funcion de openPopup en uils.js
  openPopup(popupProfile);
}

function closePopupProfile() {
  closePopup(popupProfile);
}

function openPopupAddCard() {
  inpNameAddCard.value = "";
  inpLink.value = "";
  openPopup(popupAddCard);
}

function closePopupAddCard() {
  closePopup(popupAddCard);
}

/* ---------- Instanciar validadores para cada formulario ---------- */

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button_save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Crear validadores
const profileFormValidator = new FormValidator(validationConfig, formProfile);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, formAddCard);
addCardFormValidator.enableValidation();

/* ---------- Listeners y lógica de formularios (envío) ---------- */

// Envío perfil
formProfile.addEventListener("submit", function (e) {
  e.preventDefault();
  //validacion de los campos
  const nameValid = inpName.value.trim().length >= 2;
  const aboutValid = inpAbout.value.trim().length >= 2;

  if (nameValid && aboutValid) {
    inName.textContent = inpName.value;
    inAbout.textContent = inpAbout.value;
    closePopupProfile();
  }
});

// abrir/guardar add-card
formAddCard.addEventListener("submit", function (e) {
  e.preventDefault();
  // validaciones sencillas del FormValidator
  const nameOk = inpNameAddCard.value.trim().length >= 2;
  const linkOk =
    inpLink.value.trim().startsWith("http://") ||
    inpLink.value.trim().startsWith("https://");

  if (nameOk && linkOk) {
    const card = new Card(
      { name: inpNameAddCard.value.trim(), link: inpLink.value.trim() },
      ".template-card"
    );
    gallery.prepend(card.createCard());
    closePopupAddCard();
  }
});

/* ---------- Inicializar tarjetas ---------- */
initialCards.forEach((item) => {
  const card = new Card(item, ".template-card");
  gallery.append(card.createCard());
});

/* ---------- Botones para abrir/cerrar popups ---------- */
editButton.addEventListener("click", openPopupProfile);
closeButtonProfile.addEventListener("click", closePopupProfile);

addButton.addEventListener("click", openPopupAddCard);
closeButtonAddCard.addEventListener("click", closePopupAddCard);

/* ---------- Habilitar listeners globales (clic fuera / ESC) ---------- */
enableGlobalPopupListeners();

/* ---------- Export ---------- */
export { openImagePopup };
