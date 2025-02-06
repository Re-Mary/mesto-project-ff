// OPEN Modal
export function openModal(popup) {
    if (!popup) {
        console.error('Modal element is null or undefined');
        return;
    }

    popup.classList.add('popup_is-opened');
    const closeModalButton = popup.querySelector('.popup__close');

    if (!closeModalButton) {
        console.error('Close button element is null or undefined');
        return;
    }

    // Handling close button
    function handleCloseButton() {
        closeModal(popup);
    }

    // Handling OVERLAY
    function handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) {
            closeModal(popup);
        }
    }

    // Handling ESC
    function handleEscape(evt) {
        if (evt.key === 'Escape') {
            closeModal(popup);
        }
    }

    // Add event listeners
    closeModalButton.addEventListener('click', handleCloseButton);
    popup.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleEscape);

    // Store the remove event listeners function
    popup._removeHandlers = () => {
        closeModalButton.removeEventListener('click', handleCloseButton);
        popup.removeEventListener('click', handleOverlayClick);
        document.removeEventListener('keydown', handleEscape);
    };
}

// CLOSE Modal
export function closeModal(popup) {
    if (!popup) {
        console.error('Modal element is null or undefined');
        return;
    }

    popup.classList.remove('popup_is-opened');

    if (popup._removeHandlers) {
        popup._removeHandlers();
        delete popup._removeHandlers;
    }
}
