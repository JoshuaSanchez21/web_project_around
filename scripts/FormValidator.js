export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._form = formElement;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._form.querySelector(
      this._config.submitButtonSelector
    );
  }

  // mostrar/ocultar error para un input
  _showError(inputElement, message) {
    const errorElement = inputElement.nextElementSibling;
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
    inputElement.classList.add("error");
  }

  _hideError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
    inputElement.classList.remove("error");
  }

  // validaciones de campo (texto / url)
  _checkInputValidity(inputElement) {
    const value = inputElement.value.trim();

    const isUrlField = inputElement.classList.contains("popup__input_link");

    if (value === "") {
      this._showError(inputElement, "No puede dejar este campo en blanco.");
      return false;
    }

    if (!isUrlField) {
      if (value.length < 2) {
        this._showError(
          inputElement,
          `Por favor, alargue el contenido a por lo menos 2 caracteres. Actualmente ha ingresado ${value.length}.`
        );
        return false;
      }
    } else {
      if (!value.startsWith("http://") && !value.startsWith("https://")) {
        this._showError(
          inputElement,
          "Por favor ingrese un URL válido que comience con 'http://' o 'https://'."
        );
        return false;
      }
    }

    this._hideError(inputElement);
    return true;
  }

  _hasInvalidInput() {
    return this._inputList.some(
      (input) =>
        !(
          (input.classList.contains("popup__input_link") &&
            this._validateUrlSilent(input)) ||
          this._validateTextSilent(input)
        )
    );
  }

  // validaciones "silenciosas" que no muestran error
  _validateTextSilent(input) {
    const value = input.value.trim();
    if (value === "") return false;
    if (value.length < 2) return false;
    return true;
  }

  _validateUrlSilent(input) {
    const value = input.value.trim();
    if (value === "") return false;
    if (!value.startsWith("http://") && !value.startsWith("https://"))
      return false;
    return true;
  }

  _toggleButtonState() {
    if (!this._buttonElement) return;
    const hasInvalid = this._inputList.some((input) => {
      if (input.classList.contains("popup__input_link"))
        return !this._validateUrlSilent(input);
      return !this._validateTextSilent(input);
    });

    if (hasInvalid) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        // validar el input y actualizar el estado del botón
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });

    // prevención en submit si hay inputs inválidos
    this._form.addEventListener("submit", (e) => {
      if (this._inputList.some((input) => !this._checkInputValidity(input))) {
        e.preventDefault();
      }
    });

    // inicializa estado del botón
    this._toggleButtonState();
  }

  // método público para activar la validación
  enableValidation() {
    this._setEventListeners();
  }
}
