// Card.js
export default class Card {
  constructor(data, templateSelector, userId, handlers) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked || false;
    this._ownerId = data.owner._id || data.owner;
    this._userId = userId;
    this._handlers = handlers;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".main__gallery-card")
      .cloneNode(true);
  }

  updateLikes(isLiked) {
    this._isLiked = isLiked;
    this._likeButton.classList.toggle("main__button_like_active", isLiked);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      const newLikedState = !this._isLiked;

      this._handlers.handleLikeClick(this._id, newLikedState).catch((err) => {
        console.error("Error real:", err);
      });
    });

    if (this._deleteButton) {
      this._deleteButton.addEventListener(
        "click",
        this._handlers.handleDeleteClick
      );
    }

    this._image.addEventListener("click", this._handlers.handleImageClick);
  }

  createCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".main__gallery-image");
    this._likeButton = this._element.querySelector(".main__button_like");
    this._deleteButton = this._element.querySelector(".main__button_trash");

    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }

    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector(".main__gallery-paragraph").textContent =
      this._name;

    this.updateLikes(this._isLiked);
    this._setEventListeners();

    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}
