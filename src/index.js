import "./pages/index.css";
import { createCard, deleteCard, cardLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal";

//спасибо за рекомендации! сейчас времени до сдачи впритык, поэтому реализую необязательные улучшения после жесткого делайна

// @todo: DOM узлы
const content = document.querySelector('.content');
const cardList = content.querySelector('.places__list');

// ADD Profile (+) button
const addCardProfileButton = content.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');

// ADD CARD (+) Button
const formNewPlaceAdd = document.forms["new-place"];
const popupInputCardTitle = formNewPlaceAdd.querySelector('.popup__input_type_card-name');
const popupInputCardLink = formNewPlaceAdd.querySelector('.popup__input_type_url');

// Card Images
const popupImage = document.querySelector('.popup_type_image');
const popupCardImage = popupImage.querySelector('.popup__image');
const popupCardTitle = popupImage.querySelector('.popup__caption');

// PROFILE EDIT
const editPopup = document.querySelector('.popup_type_edit');
const editProfile = document.querySelector('.profile__edit-button');
const formModal = document.querySelector('.popup__form');
const nameInput = formModal.querySelector('.popup__input_type_name');
const jobInput = formModal.querySelector('.popup__input_type_description');
const buttonForm = formModal.querySelector('.popup__button');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// FUNCTIONS
// Form functions
function openFormEditProfile(name, formEditProfile) {
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

    // Form fields handler
    function handleFieldsEditProfile(evt) {
        evt.preventDefault();
        const nameValue = nameInput.value;
        const jobValue = jobInput.value;
        formEditProfile({ name: nameValue, job: jobValue });
        nameInput.value = '';
        jobInput.value = '';
    }

    formModal.addEventListener('submit', handleFieldsEditProfile);
}

// Handle modal form edit profile
function handleFormEditProfile(formData) {
    profileTitle.textContent = formData.name;
    profileDescription.textContent = formData.job;
    closeModal(editPopup);
}

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

// @todo: Функция открытия модального окна с изображением карточки
function openCardPopup(card) {
    popupCardTitle.textContent = card.name;
    popupCardImage.src = card.link;
    popupCardImage.alt = card.name;
    openModal(popupImage);
}

// Initial Cards
const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// Render initial cards
const renderCard = (card) => {
    const cardElement = createCard(card, deleteCard, cardLike, openCardPopup);
    cardList.append(cardElement);
};

initialCards.forEach(card => {
    renderCard(card);
});

// EVENT LISTENERS
// Edit profile
editProfile.addEventListener('click', () => {
    openModal(editPopup);
    openFormEditProfile('edit-profile', handleFormEditProfile);
});

// ADD CARD (+) Button
addCardProfileButton.addEventListener('click', () => {
    openModal(popupNewCard);
});

// Attach form submit handler for adding a new card
formNewPlaceAdd.addEventListener('submit', handleFormAddCard);
