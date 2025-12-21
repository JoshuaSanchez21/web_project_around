import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup
      .querySelector(".popup__form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this._handleSubmit();
      });
  }
}
