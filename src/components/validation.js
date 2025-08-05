const hideErrow = (inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
    inputElement.nextElementSibling.textContent = '';
};
const showErrow = (inputElement) => {
    inputElement.classList.add('popup__input_type_error');
    inputElement.nextElementSibling.textContent = inputElement.validationMessage;
};

export const toggleButtonState = (formElement, formButton) => {
    formElement.checkValidity() 
        ? formButton.disabled = false 
        : formButton.disabled = true;
};

const clearValidation = (formElement) => {
    const formInputs = formElement.querySelectorAll("input");
    formInputs.forEach((input) => {
        hideErrow(input);
        input.setCustomValidity('');
    });
};

export const enableValidation = (formElement) => {
    const formInputs = formElement.querySelectorAll("input");
    const formButton = formElement.querySelector('.popup__button');
    
    formInputs.forEach((input) => {
        input.addEventListener('input', function (event) {
            input.validity.patternMismatch 
                ? input.setCustomValidity(input.dataset.errorMessage) 
                : input.setCustomValidity('');
            input.validity.valid 
                ? hideErrow(input) 
                : showErrow(input);

                /*
            formElement.checkValidity() 
                ? formButton.disabled = false 
                : formButton.disabled = true; 
                */
            toggleButtonState(formElement, formButton);
        });
        clearValidation(formElement);
    });
}




