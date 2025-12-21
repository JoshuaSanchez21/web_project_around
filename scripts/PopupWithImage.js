import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector); // Llama al constructor del padre
    this._image = this._popup.querySelector(".popup__img");
    this._caption = this._popup.querySelector(".popup__caption");
  }

  // Sobrescribir el metodo open() del padre
  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open(); // Llamar al open() del padre (agregar la clase popup_opened y ESC)
  }
}
