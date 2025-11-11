// --- POPUP EDITAR PERFIL ---
const editButton = document.querySelector(".main__button_edit");
const popupProfile = document.querySelector(".popup_profile");
const closeButtonProfile = popupProfile.querySelector(".popup__button_close");
const formProfile = popupProfile.querySelector(".popup__container");
const inName = document.querySelector(".main__paragraph_name");
const inAbout = document.querySelector(".main__paragraph_role");
const inpName = popupProfile.querySelector(".popup__input_name");
const inpAbout = popupProfile.querySelector(".popup__input_about");
const saveButtonProfile = popupProfile.querySelector(".popup__button_save");

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// Abrir y cerrar popup de perfil
function openPopupProfile() {
  inpName.value = "";
  inpAbout.value = "";
  hideError(inpName);
  hideError(inpAbout);
  validateProfileInputs();
  openPopup(popupProfile);
}

function closePopupProfile() {
  closePopup(popupProfile);
}

// Listeners perfil
inpName.addEventListener("input", function () {
  validateInputField(inpName);
  validateProfileInputs();
});

inpAbout.addEventListener("input", function () {
  validateInputField(inpAbout);
  validateProfileInputs();
});

editButton.addEventListener("click", openPopupProfile);
closeButtonProfile.addEventListener("click", closePopupProfile);

formProfile.addEventListener("submit", function (e) {
  e.preventDefault();
  const isNameValid = validateInputField(inpName);
  const isAboutValid = validateInputField(inpAbout);

  if (isNameValid && isAboutValid) {
    inName.textContent = inpName.value;
    inAbout.textContent = inpAbout.value;
    closePopupProfile();
  }
});

// --- POPUP AGREGAR TARJETAS ---
const gallery = document.querySelector(".main__gallery");
const addButton = document.querySelector(".main__button_add");
const popupAddCard = document.querySelector(".popup_add-card");
const closeButtonAddCard = popupAddCard.querySelector(".popup__button_close");
const formAddCard = popupAddCard.querySelector(".popup__container");
const inpNameAddCard = popupAddCard.querySelector(".popup__input_name");
const inpLink = popupAddCard.querySelector(".popup__input_link");
const saveButtonAddCard = popupAddCard.querySelector(".popup__button_save");

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

// Crear tarjeta
function createCard(name, link) {
  const template = document
    .querySelector(".template-card")
    .content.querySelector(".main__gallery-card");
  const card = template.cloneNode(true);

  const cardImg = card.querySelector(".main__gallery-image");
  cardImg.src = link;
  cardImg.alt = name;
  cardImg.style.cursor = "pointer";
  cardImg.addEventListener("click", () => openImagePopup(link, name));

  card.querySelector(".main__gallery-paragraph").textContent = name;

  const likeButton = card.querySelector(".main__button_like");
  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("main__button_like_active")
  );

  const removeButton = card.querySelector(".main__button_trash");
  removeButton.addEventListener("click", () => card.remove());

  return card;
}

// Inicializar tarjetas
initialCards.forEach((item) =>
  gallery.append(createCard(item.name, item.link))
);

function validateProfileInputs() {
  const isNameValid = inpName.value.trim() !== "";
  const isAboutValid = inpAbout.value.trim() !== "";
  saveButtonProfile.disabled = !(isNameValid && isAboutValid);
}

// Abrir y cerrar popup agregar tarjeta
function openPopupAddCard() {
  inpNameAddCard.value = "";
  inpLink.value = "";
  hideError(inpNameAddCard);
  hideError(inpLink);
  saveButtonAddCard.disabled = true;
  openPopup(popupAddCard);
}

function closePopupAddCard() {
  closePopup(popupAddCard);
}

addButton.addEventListener("click", openPopupAddCard);
closeButtonAddCard.addEventListener("click", closePopupAddCard);

formAddCard.addEventListener("submit", function (e) {
  e.preventDefault();
  const isNameValid = validateInputField(inpNameAddCard);
  const isLinkValid = validateInputURL(inpLink);

  if (isNameValid && isLinkValid) {
    gallery.prepend(createCard(inpNameAddCard.value, inpLink.value));
    closePopupAddCard();
  }
});

inpNameAddCard.addEventListener("input", function () {
  const isNameValid = validateInputField(inpNameAddCard);
  const isLinkFilled = inpLink.value.trim() !== "";
  saveButtonAddCard.disabled = !(isNameValid && isLinkFilled);
});

inpLink.addEventListener("input", function () {
  const isLinkValid = validateInputURL(inpLink);
  const isNameValid = validateInputField(inpNameAddCard);
  saveButtonAddCard.disabled = !(isNameValid && isLinkValid);
});

// --- POPUP IMAGEN ---
const popupImage = document.querySelector(".popup_image");

if (popupImage) {
  const popupImg = popupImage.querySelector(".popup__img");
  const popupCaption = popupImage.querySelector(".popup__caption");
  const closeImagePopup = popupImage.querySelector(".popup__button_close");

  function openImagePopup(src, alt) {
    popupImg.src = src;
    popupImg.alt = alt || "";
    popupCaption.textContent = alt || "";
    openPopup(popupImage);
  }

  function closeImagePopupFunc() {
    closePopup(popupImage);
    popupImg.src = "";
  }

  closeImagePopup.addEventListener("click", closeImagePopupFunc);
  popupImage.addEventListener("mousedown", (e) => {
    if (e.target === popupImage) closeImagePopupFunc();
  });

  // Exponer función globalmente
  window.openImagePopup = openImagePopup;
}

// --- Cerrar popup al hacer clic fuera del contenido ---
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (e.target === popup) closePopup(popup);
  });
});

// --- Cerrar popup con tecla ESC ---
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup.popup_opened");
    if (openedPopup) closePopup(openedPopup);
  }
});

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button_save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
