// Validación individual
function showError(input, message) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = message;
  errorElement.style.display = "block";
  input.classList.add("error");
}

function hideError(input) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = "";
  errorElement.style.display = "none";
  input.classList.remove("error");
}

function validateInputField(input) {
  const value = input.value.trim();
  if (value === "") {
    showError(input, "No puede dejar este campo en blanco.");
    return false;
  } else if (value.length < 2) {
    showError(
      input,
      `Por favor, alargue el contenido a por lo menos 2 caracteres. Actualmente ha ingresado ${value.length}.`
    );
    return false;
  } else {
    hideError(input);
    return true;
  }
}

function validateInputURL(input) {
  const value = input.value.trim();
  if (value === "") {
    showError(input, "No puede dejar este campo en blanco.");
    return false;
  } else if (!value.startsWith("http://") && !value.startsWith("https://")) {
    showError(
      input,
      "Por favor ingrese un URL válido que comience con 'http://' o 'https://'."
    );
    return false;
  } else {
    hideError(input);
    return true;
  }
}

// --- Función general de validación (para consistencia futura) ---
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  if (!forms.length) return;

  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);

    if (!submitButton) return;

    const hasInvalidInput = () =>
      inputs.some(
        (input) =>
          !(
            (input.classList.contains("popup__input_link") &&
              validateInputURL(input)) ||
            validateInputField(input)
          )
      );

    const toggleButtonState = () => {
      if (hasInvalidInput()) {
        submitButton.disabled = true;
        submitButton.classList.add(config.inactiveButtonClass);
      } else {
        submitButton.disabled = false;
        submitButton.classList.remove(config.inactiveButtonClass);
      }
    };

    inputs.forEach((input) => {
      input.addEventListener("input", toggleButtonState);
    });

    form.addEventListener("submit", (e) => {
      if (hasInvalidInput()) e.preventDefault();
    });

    toggleButtonState();
  });
}
