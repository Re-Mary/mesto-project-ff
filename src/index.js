import "./pages/index.css";
import { initialCards, createCard, deleteCard, cardLike } from "./components/cards.js";
import { openModal, closeModal } from "./components/modal";

// @todo: DOM узлы
const content = document.querySelector('.content');
const cardList = content.querySelector('.places__list');

// ADD Profile (+) button
const addCardProfileButton = content.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');

// Card Images
const popupImage = document.querySelector('.popup_type_image');
const popupCardImage = popupImage.querySelector('.popup__image');
const popupCardTitle = popupImage.querySelector('.popup__caption');

// PROFILE EDIT
const editPopup = document.querySelector('.popup_type_edit');
const editProfile = document.querySelector('.profile__edit-button');
const formModal = document.querySelector('.popup__form');
const formEditProfile = document.forms['edit-profile'];
const nameInput = formModal.querySelector('.popup__input_type_name');
const jobInput = formModal.querySelector('.popup__input_type_description');
const buttonForm = formModal.querySelector('.popup__button');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Edit profile
editProfile.addEventListener('click', () => {
    openModal(editPopup);
    openForm('edit-profile', handleFormEditProfile);
});

// CLOSE button
const closeButton = editPopup.querySelector('.popup__close');
closeButton.addEventListener('click', () => {
    closeModal(editPopup);
});

// Form functions
function openForm(name, formEditProfile) {
    if (!formModal) {
        console.error('Form modal element is null or undefined');
        return;
    }

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

    if (!nameInput || !jobInput || !buttonForm) {
        console.error('Form input elements are null or undefined');
        return;
    }

    // Form submit handler
    function handleFormSubmit(evt) {
        evt.preventDefault();
        const nameValue = nameInput.value;
        const jobValue = jobInput.value;
        formEditProfile({ name: nameValue, job: jobValue });
        nameInput.value = '';
        jobInput.value = '';
    }

    formModal.addEventListener('submit', handleFormSubmit);
    buttonForm.addEventListener('click', (evt) => {
        evt.preventDefault();
        handleFormSubmit(evt);
    });
}

// Handle form edit profile
function handleFormEditProfile(formData) {
    profileTitle.textContent = formData.name;
    profileDescription.textContent = formData.job;
    closeModal(editPopup);
}

// ADD CARD (+) Button
const formNewPlaceAdd = document.forms["new-place"];
const popupInputCardTitle = formNewPlaceAdd.querySelector('.popup__input_type_card-name');
const popupInputCardLink = formNewPlaceAdd.querySelector('.popup__input_type_url');

addCardProfileButton.addEventListener('click', () => {
    openModal(popupNewCard);
});

function handleFormAddCard(evt) {
    evt.preventDefault();
    const cardData = {
        name: popupInputCardTitle.value,
        link: popupInputCardLink.value
    };

    const cardElement = createCard(cardData, deleteCard, cardLike, openCardPopup);
    cardList.prepend(cardElement);
    formNewPlaceAdd.reset();
    closeModal(popupNewCard);
}

function openCardPopup(cardImage) {
    popupCardTitle.textContent = cardImage.name;
    popupCardImage.src = cardImage.link;
    popupCardImage.alt = cardImage.name;
    openModal(popupImage);
}

// Render initial cards
const renderCard = (card) => {
    const cardElement = createCard(card, deleteCard, cardLike, openCardPopup);
    cardList.append(cardElement);
};

initialCards.forEach(card => {
    renderCard(card);
});

// Attach form submit handler for adding a new card
formNewPlaceAdd.addEventListener('submit', handleFormAddCard);
