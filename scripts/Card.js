import { openImagePopup } from "./utils.js";

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  // obtiene y clona la plantilla
  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".main__gallery-card");
    return template.cloneNode(true);
  }

  // asigna datos (imagen, alt, texto)
  _fillCard(cardElement) {
    const img = cardElement.querySelector(".main__gallery-image");
    const text = cardElement.querySelector(".main__gallery-paragraph");

    img.src = this._link;
    img.alt = this._name;
    img.style.cursor = "pointer";
    text.textContent = this._name;
  }

  // agrega los event listeners de la card (like, borrar, abrir imagen)
  _setEventListeners(cardElement) {
    const likeBtn = cardElement.querySelector(".main__button_like");
    const removeBtn = cardElement.querySelector(".main__button_trash");
    const img = cardElement.querySelector(".main__gallery-image");

    likeBtn.addEventListener("click", () =>
      likeBtn.classList.toggle("main__button_like_active")
    );

    removeBtn.addEventListener("click", () => cardElement.remove());

    img.addEventListener("click", () => openImagePopup(this._link, this._name));
  }

  // método público que devuelve la tarjeta completa
  createCard() {
    const card = this._getTemplate();
    this._fillCard(card);
    this._setEventListeners(card);
    return card;
  }
}
