import Api from "./Api.js";
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";

// ================= API =================
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "4d3f73b5-7319-4de2-8c06-7293f6155784",
    "Content-Type": "application/json",
  },
});

// ================= USER =================
const userInfo = new UserInfo({
  nameSelector: ".main__paragraph_name",
  aboutSelector: ".main__paragraph_role",
  avatarSelector: ".main__profile-photo",
});

// ================= POPUPS =================
const popupImage = new PopupWithImage(".popup_image");
popupImage.setEventListeners();

const popupConfirm = new PopupWithConfirmation(".popup_confirm");
popupConfirm.setEventListeners();

// Popup Editar Perfil
const popupProfile = new PopupWithForm(".popup_profile", (data) => {
  popupProfile.renderLoading(true, "Guardando...");
  api
    .updateUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch(console.error)
    .finally(() => {
      popupProfile.renderLoading(false);
      popupProfile.close();
    });
});
popupProfile.setEventListeners();

// Popup Agregar Tarjeta
const popupAddCard = new PopupWithForm(".popup_add-card", (data) => {
  popupAddCard.renderLoading(true, "Creando...");
  api
    .addCard({ name: data.title, link: data.link })
    .then((cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement, true);
    })
    .catch(console.error)
    .finally(() => {
      popupAddCard.renderLoading(false);
      popupAddCard.close();
    });
});
popupAddCard.setEventListeners();

// Popup Actualizar Avatar
const popupAvatar = new PopupWithForm(".popup_avatar", (data) => {
  popupAvatar.renderLoading(true, "Guardando...");
  api
    .updateAvatar({ avatar: data.avatar })
    .then((res) => {
      userInfo.setAvatar(res.avatar);
    })
    .catch(console.error)
    .finally(() => {
      popupAvatar.renderLoading(false);
      popupAvatar.close();
    });
});
popupAvatar.setEventListeners();

// ================= SECTION & CARD =================
let userId;
let cardSection;

function createCard(item) {
  const cardData = {
    _id: item._id,
    name: item.name,
    link: item.link,
    isLiked: item.isLiked,
    owner: item.owner?._id || item.owner,
  };

  const card = new Card(cardData, "#card-template", userId, {
    handleImageClick: () => popupImage.open(cardData.name, cardData.link),

    handleDeleteClick: () => {
      popupConfirm.setSubmitAction(() => {
        api
          .deleteCard(cardData._id)
          .then(() => {
            card.removeCard();
            popupConfirm.close();
          })
          .catch(console.error);
      });
      popupConfirm.open();
    },

    handleLikeClick: (cardId, desiredState) => {
      return (
        desiredState ? api.likeCard(cardId) : api.unlikeCard(cardId)
      ).then((updatedCard) => {
        card.updateLikes(updatedCard.isLiked);
      });
    },
  });

  return card.createCard();
}

// ================= INIT =================
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = String(userData._id);

    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData.avatar);

    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => {
          const cardElement = createCard(item);
          cardSection.addItem(cardElement);
        },
      },
      ".main__gallery"
    );

    cardSection.renderItems();
  })
  .catch(console.error);

// ================= VALIDATION =================
const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button_save",
  inactiveButtonClass: "popup__button_disabled",
};

new FormValidator(config, document.forms["profile-form"]).enableValidation();
new FormValidator(config, document.forms["card-form"]).enableValidation();
new FormValidator(config, document.forms["avatar-form"]).enableValidation();

// ================= BUTTONS =================
document.querySelector(".main__button_edit").addEventListener("click", () => {
  const currentInfo = userInfo.getUserInfo();
  popupProfile._form.elements.name.value = currentInfo.name;
  popupProfile._form.elements.about.value = currentInfo.about;
  popupProfile.open();
});

document.querySelector(".main__button_add").addEventListener("click", () => {
  popupAddCard.open();
});

document
  .querySelector(".main__button_edit-avatar")
  .addEventListener("click", () => {
    popupAvatar.open();
  });
