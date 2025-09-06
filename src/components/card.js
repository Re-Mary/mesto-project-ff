import { addLike, deleteLike, deleteCards } from "./api";



// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

// @todo: Create function to create card
export function createCard(card, deleteCard, cardLike, openCardPopup, userId) {
  const cardElement = getTemplate();
  if (!cardElement) {
    console.error('Card element is null or undefined');
    return;
  }

  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const isLiked = card.likes.some((like) => like._id === userId);
  const likeCounter = cardElement.querySelector('.card__like-counter');

  const isOwner = card.owner._id === userId;
  if (!isOwner) {
    deleteButton.style.display = 'none';
  }

 
  cardElement.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = `На изображении ${card.name}`;
  likeCounter.textContent = card.likes.length;

  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // EVENTLISTNERS
  //Delete card event listener
  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement, card._id); 
  });

  // Like card event listener
  likeButton.addEventListener('click', () => {
    cardLike(likeButton, card._id, likeCounter);
  });

  cardImage.addEventListener('click', () => {
    openCardPopup(card);
  });

  return cardElement;
}

// @todo: Create function to delete card
export const deleteCard = (cardElement, cardId) => {
    deleteCards(cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.error('Ошибка при удалении карточки:', err);
      });
  }

// @todo: Create function to like card
export const cardLike = (likeButton, cardId, likeCounter) => {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const likePromise = isLiked ? deleteLike(cardId) : addLike(cardId);

  likePromise
    .then((data) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCounter.textContent = data.likes.length;
    })
    .catch((err) => {
      console.error('Ошибка при добавлении/удалении лайка', err);
    });
}
    
