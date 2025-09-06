const hideError = (inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
    inputElement.nextElementSibling.textContent = '';
};

const showError = (inputElement) => {
    inputElement.classList.add('popup__input_type_error');
    inputElement.nextElementSibling.textContent = inputElement.validationMessage;
};

export const toggleButtonState = (formElement, config) => {
    const button = formElement.querySelector(config.submitButtonSelector);
    const isFormValid = formElement.checkValidity();
    
    if (isFormValid) {
        button.disabled = false;
        button.classList.remove(config.inactiveButtonClass);
    } else {
        button.disabled = true;
        button.classList.add(config.inactiveButtonClass);
    }

};



export const clearValidation = (formElement, config) => {
    const formInputs = formElement.querySelectorAll(config.inputSelector);

    formInputs.forEach((input) => {
        hideError(input);
        input.setCustomValidity('');
    });

    toggleButtonState(formElement, config);
};

const checkInputValidity = (formElement, inputElement, config) => {
    if (inputElement.validity.valid) {
        hideError(inputElement);
    } else {
        showError(inputElement);
    }

    toggleButtonState(formElement, config);
};

export function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach((form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        const inputs = form.querySelectorAll(config.inputSelector);
        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                checkInputValidity(form, input, config);
            });
        });

        toggleButtonState(form, config);
    });
}



