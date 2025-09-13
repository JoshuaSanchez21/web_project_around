//Editar perfil

const editButton = document.querySelector(".main__button_edit");
const popup = document.querySelector(".popup_profile");
const closeButton = popup.querySelector(".popup__button_close");
const form = popup.querySelector(".popup__container");
const inName = document.querySelector(".main__paragraph_name");
const inAbout = document.querySelector(".main__paragraph_role");
const inpName = popup.querySelector(".popup__input_name");
const inpAbout = popup.querySelector(".popup__input_about");
const saveButton = popup.querySelector(".popup__button_save");

function openEditEmpty() {
  inpName.value = "";
  inpAbout.value = "";
  saveButton.disabled = true;
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function validateInputs() {
  const isNameValid = inpName.value.trim() !== "";
  const isAboutValid = inpAbout.value.trim() !== "";
  saveButton.disabled = !(isNameValid && isAboutValid);
}

function openEdit() {
  inpName.value = "";
  inpAbout.value = "";
  validateInputs();

  popup.classList.toggle("popup_opened");
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

//Añadir tarjeta

const gallery = document.querySelector(".main__gallery");

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

function createCard(name, link) {
  //localizamos el template
  //lo duplicamos
  //buscamos el nodo de la imagen y colocamos el src y alt
  //buscamos el nodo del texto y ponemos el textcontent
  //buscar el boton de like y agregar el evento
  //buscar el boton de borrar y agregar el evento

  const template = document
    .querySelector(".template-card")
    .content.querySelector(".main__gallery-card");
  const card = template.cloneNode(true);
  const cardImg = card.querySelector(".main__gallery-image");
  cardImg.src = link;
  cardImg.alt = name;
  const cardTxt = card.querySelector(".main__gallery-paragraph");
  cardTxt.textContent = name;
  cardImg.style.cursor = "pointer";
  cardImg.addEventListener("click", function () {
    openImagePopup(link, name);
  });

  const likeButton = card.querySelector(".main__button_like");
  likeButton.addEventListener("click", function () {
    //main__button_like_active
    likeButton.classList.toggle("main__button_like_active");
  });

  const removeCard = card.querySelector(".main__button_trash");

  removeCard.addEventListener("click", function () {
    card.remove();
  });
  return card;
}

initialCards.forEach(function (item) {
  const card = createCard(item.name, item.link);
  gallery.append(card);
});

const addButton = document.querySelector(".main__button_add");
const popupAddCard = document.querySelector(".popup_add-card");
const closeButtonAddCard = popupAddCard.querySelector(".popup__button_close");
const formAddCard = popupAddCard.querySelector(".popup__container");
const inpNameAddCard = popupAddCard.querySelector(".popup__input_name");
const inpLink = popupAddCard.querySelector(".popup__input_link");
const saveButtonAddCard = popupAddCard.querySelector(".popup__button_save");

addButton.addEventListener("click", function () {
  popupAddCard.classList.add("popup_opened");
});

closeButtonAddCard.addEventListener("click", function () {
  popupAddCard.classList.remove("popup_opened");
});

formAddCard.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = inpNameAddCard.value;
  const link = inpLink.value;
  if (name && link) {
    const card = createCard(name, link);
    gallery.prepend(card);
    popupAddCard.classList.remove("popup_opened");
  }
});

//Img Popup
const popupImage = document.querySelector(".popup_image");

let popupImg, popupCaption, closeImagePopup;
if (popupImage) {
  popupImg = popupImage.querySelector(".popup__img");
  popupCaption = popupImage.querySelector(".popup__caption");
  closeImagePopup = popupImage.querySelector(".popup__button_close");

  function openImagePopup(src, alt) {
    if (!popupImage) return;
    popupImg.src = src;
    popupImg.alt = alt || "";
    popupCaption.textContent = alt || "";
    popupImage.classList.add("popup_opened");
  }

  closeImagePopup.addEventListener("click", () => {
    popupImage.classList.remove("popup_opened");
    popupImg.src = "";
  });

  popupImage.addEventListener("click", function (e) {});

  popupImage.addEventListener("click", (e) => {
    if (e.target === popupImage) {
      popupImage.classList.remove("popup_opened");
      popupImg.src = "";
    }
  });
}
