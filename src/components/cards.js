export const initialCards = [
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


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
// as argument should be card data and callback function for delete the card
export function createCard(card, deleteCard, cardLike, openCardPopup) {
    // clone content of the card
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    if (!cardElement) {
        console.error('Card element is null or undefined');
        return;
    }

    // create variable for delete button
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');

    if (!deleteButton || !likeButton || !cardImage) {
        console.error('Card buttons or image elements are null or undefined');
        return;
    }

    // set the value for nested elements
    cardElement.querySelector('.card__title').textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = `На изображении ${card.name}`;

    // add eventListener for delete-icon with a callback as an argument
    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement); // call back with an argument
    });

    // add eventListener for like-button with a callback as an argument
    likeButton.addEventListener('click', () => {
        cardLike(likeButton);
    });

    // add eventListener for card image click to open the image modal window
    cardImage.addEventListener('click', () => {
        openCardPopup(card);
    });

    // not forget to return
    return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Функция лайка карточки
export function cardLike(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

// @todo: Функция открытия модального окна с изображением карточки
export function openCardPopup(card) {
    const popupImage = document.querySelector('.popup_type_image');
    const popupCardImage = popupImage.querySelector('.popup__image');
    const popupCardTitle = popupImage.querySelector('.popup__caption');

    if (!popupImage || !popupCardImage || !popupCardTitle) {
        console.error('Popup image elements are null or undefined');
        return;
    }

    popupCardImage.src = card.link;
    popupCardTitle.textContent = card.name;
    popupCardImage.alt = card.name;
    openModal(popupImage);
}