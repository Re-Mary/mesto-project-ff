import "./pages/index.css";
import { createCard, deleteCard, cardLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation} from "./components/validation.js";
import { getUserInfo, getCards, changeUserInfo, changeAvatar, addCard } from "./components/api.js";


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
const addCardButton = formNewPlaceAdd.querySelector('.popup__button');

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
const profileImage = document.querySelector('.profile__image');
const editProfileSaveButton = editProfileForm.querySelector('.popup__button');

// AVATAR EDIT
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupAvatarForm = document.forms['new-avatar'];
const popupInputAvatarLink = popupAvatarForm.querySelector('.popup__input_type_url');
const saveAvatarButton = popupAvatarForm.querySelector('.popup__button');

// CONFIG
export const validationConfig= {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};


// Load data from server
Promise.all([getUserInfo(), getCards()])
    .then(([user, cards]) => {
        updatedUser(user);
        const userId = user._id;
        cards.forEach((card) => {
            const cardElement = createCard(
                card, 
                deleteCard, 
                cardLike,
                openCardPopup,
                userId,
            );
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
    profileImage.style.backgroundImage = `url(${user.avatar})`;
}

// FUNCTIONS
// Form functions
const openFormEditProfile = () => {
    editProfileNameInput.value = profileTitle.textContent;
    editProfileJobInput.value = profileDescription.textContent;
    clearValidation(editProfileForm, editProfileSaveButton, validationConfig);
}

const openFormAddCard = () => {
    formNewPlaceAdd.reset();
    clearValidation(formNewPlaceAdd, addCardButton, validationConfig);
}

// OPEN Modal for edit avatar
const openAvatarPopup = () => {
    openModal(popupAvatar);
    popupAvatarForm.reset();
    clearValidation(popupAvatarForm, saveAvatarButton, validationConfig);
}

// Handle modal form edit profile
const handleFormEditProfile = (evt) => {
    evt.preventDefault(); 
    const nameValue = editProfileNameInput.value;
    const jobValue = editProfileJobInput.value;
    changeUserInfo({ name: nameValue, about: jobValue })
        .then((user) => {
            profileTitle.textContent = user.name;
            profileDescription.textContent = user.about;
            closeModal(editPopup);
        })
        .catch((err) => {
            console.error('Ошибка обновления профиля:', err);
        });
}

const handleFormAddCard = (evt) => {
    evt.preventDefault(); 
    const newCard = {
        name: popupInputCardTitle.value,
        link: popupInputCardLink.value,
        likes: []
    };

    addCard(newCard)
    .then((cardFromServer) => {
        cardList.prepend(createCard(
             cardFromServer,
             deleteCard, 
             cardLike, 
             openCardPopup, 
             cardFromServer.owner._id
            ));
        formNewPlaceAdd.reset(); 
        closeModal(popupNewCard)})
    .catch(err => console.error(`Ошибка: ${err}`))
}



// @todo: Create function to open card popup
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


// Edit avatar
profileImage.addEventListener('click', openAvatarPopup)

popupAvatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault(); 
    const avatarLink = popupInputAvatarLink.value;

    changeAvatar({avatar: avatarLink})
        .then((userData) => {
            profileImage.style.backgroundImage =` url(${userData.avatar})`;
            closeModal(popupAvatar);
        })
        .catch((err) => {
            console.error('Ошибка при изменении аватара:', err);
        })
        .finally(() => {
            saveAvatarButton.textContent = 'Сохранить';
        });
});


enableValidation(validationConfig);

