export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(e) {
    if (e.target === this._popup) {
      this.close();
    }
  }

  setEventListeners() {
    // Cerrar con la X
    const closeButton = this._popup.querySelector(".popup__button_close");
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    }

    // Cerrar al hacer clic en el fondo
    this._popup.addEventListener("mousedown", this._handleOverlayClick);
  }
}
