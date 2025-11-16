export function openPopup(popup) {
  if (!popup) return;
  popup.classList.add("popup_opened");
}

export function closePopup(popup) {
  if (!popup) return;
  popup.classList.remove("popup_opened");
}

export function openImagePopup(src, alt) {
  const popupImage = document.querySelector(".popup_image");
  if (!popupImage) return;
  const popupImg = popupImage.querySelector(".popup__img");
  const popupCaption = popupImage.querySelector(".popup__caption");
  popupImg.src = src;
  popupImg.alt = alt || "";
  popupCaption.textContent = alt || "";
  openPopup(popupImage);
}

export function enableGlobalPopupListeners() {
  // CLIC FUERA DEL CONTENIDO
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener("mousedown", (e) => {
      if (e.target === popup) closePopup(popup);
    });

    // Evita que clics dentro del contenido cierren el popup
    popup
      .querySelector(".popup__container")
      ?.addEventListener("mousedown", (e) => e.stopPropagation());
  });

  // ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const openedPopup = document.querySelector(".popup.popup_opened");
      if (openedPopup) closePopup(openedPopup);
    }
  });

  // BOTÓN X DEL POPUP DE IMAGEN
  const popupImage = document.querySelector(".popup_image");
  if (popupImage) {
    const popupImageCloseButton = popupImage.querySelector(
      ".popup__button_close"
    );

    if (popupImageCloseButton) {
      popupImageCloseButton.addEventListener("click", () => {
        closePopup(popupImage);
        const popupImg = popupImage.querySelector(".popup__img");
        if (popupImg) popupImg.src = "";
      });
    }
  }
}
