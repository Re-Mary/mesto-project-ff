import "./pages/index.css";
import { createCard, deleteCard, cardLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal";
import { enableValidation} from "./components/validation.js";
import { getUserInfo, getCards, changeUserInfo, changeAvatar } from "./components/api.js";


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
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.forms["edit-profile"];
const editProfileNameInput = editProfileForm.querySelector('.popup__input_type_name');
const editProfileJobInput = editProfileForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");



//Validation configuration
/*
const validationConfig= {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
*/


// Load data from server (user and cards)
Promise.all([getUserInfo(), getCards()])
    .then(([user, cards]) => {
        updatedUser(user);
        const userId = user._id;
        cards.forEach((card) => {
            const cardElement = createCard(
                card, 
                userId, 
                deleteCard, 
                cardLike,
                openCardPopup);
            cardList.append(cardElement);
        });
    })
    .catch((err) => {
        console.error(err);
    }); 

// Update info on the page
const updatedUser = (user) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    popupCardImage.src = user.avatar;
    popupCardImage.alt = `На изображении ${user.name}`; 
}

// Load and render cards from server
getCards()
    .then((cards) => {
        cards.forEach((card) => {
            const cardElement = createCard(card, userId, deleteCard, cardLike, openCardPopup);
            const likeCounter = cardElement.querySelector('.card__like-counter');
            likeCounter.textContent = card.likes.length;
            cardList.append(cardElement);
        });
    })
    .catch((err) => {
        console.error(err);
    });


// FUNCTIONS
// Form functions
const openFormEditProfile = () => {
    if (!editProfileForm) {
        console.error('Form modal element is null or undefined');
        return;
    }

    enableValidation(editProfileForm);

    editProfileNameInput.value = profileTitle.textContent;
    editProfileJobInput.value = profileDescription.textContent;
}

const openFormAddCard = () => {
    if (!formNewPlaceAdd) {
        console.error('Form modal element is null or undefined');
        return;
    }

    enableValidation(formNewPlaceAdd);

    formNewPlaceAdd.reset();
}

// Handle modal form edit profile (text fields)
const handleFormEditProfile = (evt) => {
    evt.preventDefault(); 
    const nameValue = editProfileNameInput.value;
    const jobValue = editProfileJobInput.value;

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;
    closeModal(editPopup); 
}

const handleFormAddCard = (evt) => {
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
const openCardPopup = (card) => {
    popupCardTitle.textContent = card.name;
    popupCardImage.src = card.link;
    popupCardImage.alt = card.name;
    openModal(popupImage);
}

// EVENT LISTENERS
// Edit profile
editProfileButton.addEventListener('click', () => {
    openModal(editPopup);
    openFormEditProfile(); 
});

// ADD CARD (+) Button
addCardProfileButton.addEventListener('click', () => {
    openModal(popupNewCard);
    openFormAddCard();
});


// Attach form submit handler for adding a new card
formNewPlaceAdd.addEventListener('submit', handleFormAddCard);

// Attach form submit handler for editing profile
editProfileForm.addEventListener('submit', handleFormEditProfile);





// // AVATAR EDIT
// const popupAvatar = document.querySelector('.profile__image');
// const popupAvatarForm = document.forms["popup_type_image"];
// const editAvatarButton = document.querySelector('.profile__edit-avatar-button');
// const popupInputAvatarLink = popupAvatarForm.querySelector('.popup__input_type_avatar-link');
// const saveAvatarButton = popupAvatarForm.querySelector('.popup__button');

// // Функция открытия модального окна редактирования аватара
// const openAvatarPopup = () => {
//     if (!popupAvatarForm) {
//         console.error('Form modal element is null or undefined');
//         return;
//     }
//     enableValidation(popupAvatarForm);

// }

// // Edit avatar
// editAvatarButton.addEventListener('click', () => {
//     openModal(openAvatarPopup);
// });

// saveAvatarButton.addEventListener('click', () => {
//     popupInputAvatarLink.value = popupAvatarForm.querySelector('.popup__input_type_avatar-link').value;
//     changeAvatar(); 
//     closeModal(popupAvatarForm);
// });


// // ToDo счетчик лайков
// const likeCounter = document.querySelectorAll('.card__like-counter');
// // все лайки лежат в одном массиве likes. При нажатии на лайк, 
// // в массиве изменяется количество лайков, при нажатии на дизлайк, 
// // в массиве уменьшается количество лайков. Длина массива - количество лайков.
// const likes = document.querySelectorAll('.card__like-button');
// likes.forEach((like, index) => {
//     likeCounter[index].textContent = likes.length;
// });