const hideError = (inputElement, config) => {
    inputElement.classList.remove(config.inputErrorClass);
    inputElement.nextElementSibling.textContent = '';
};

const showError = (inputElement, config) => {
    inputElement.classList.add(config.inputErrorClass);
    inputElement.nextElementSibling.textContent = inputElement.validationMessage;
};

export const toggleButtonState = (formElement, button, config) => {
    const isFormValid = formElement.checkValidity();
    
    if (isFormValid) {
        button.disabled = false;
        button.classList.remove(config.inactiveButtonClass);
    } else {
        button.disabled = true;
        button.classList.add(config.inactiveButtonClass);
    }
};



export const clearValidation = (formElement, button, config) => {
    const formInputs = formElement.querySelectorAll(config.inputSelector);

    formInputs.forEach((input) => {
        hideError(input, config);
        input.setCustomValidity('');
    });

    toggleButtonState(formElement, button, config);
};

const checkInputValidity = (formElement, inputElement, button, config) => {
    const customErrorMessage = inputElement.dataset.errorMessage;

    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(customErrorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (inputElement.validity.valid) {
        hideError(inputElement, config);
    } else {
        showError(inputElement, config);
    }

    toggleButtonState(formElement, button, config);
};



export function enableValidation(config) {
const forms = document.querySelectorAll(config.formSelector);
    
    forms.forEach((form) => {
        const button = form.querySelector(config.submitButtonSelector);
        const inputs = form.querySelectorAll(config.inputSelector);

        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                checkInputValidity(form, input, button, config);
            });
        });

        toggleButtonState(form, button, config);
    });
}
