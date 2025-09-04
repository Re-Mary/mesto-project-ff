import { addLike, deleteLike } from "./api";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//Поиск шаблона карточки
const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

// @todo: Функция создания карточки
// as argument should be card data and callback function for delete the card
export function createCard(card, deleteCard, cardLike, openCardPopup, userId) {
  // clone content of the card
  const cardElement = getTemplate();
  if (!cardElement) {
    console.error('Card element is null or undefined');
    return;
  }

  // create variable for delete button
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
//  const userId = card.owner._id;
  const isLiked = card.likes.some((like) => like._id === userId);
  const likeCounter = cardElement.querySelector('.card__like-counter');

 if (!cardElement || !deleteButton || !likeButton || !cardImage) {
  console.error('Ошибка: не найдены элементы карточки');
  return;
}

  // set the value for nested elements
  cardElement.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = `На изображении ${card.name}`;

  // set the value for like counter
  likeCounter.textContent = card.likes.length;
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // add eventListener for trash-bin_icon(delete card) with a callback as an argument
  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement); // callback with an argument
  });

  // add eventListener for like-button with a callback as an argument
  likeButton.addEventListener('click', () => {
    cardLike(likeButton, card._id);
  });

  // add eventListener for card image click to open the image modal window
  cardImage.addEventListener('click', () => {
    openCardPopup(card);
  });

  // not forget to return
  return cardElement;
}

// @todo: Функция удаления карточки
export const deleteCard = (cardElement) => {
  cardElement.remove();
}

// @todo: Функция лайка карточки
//Добавление лайка
export const cardLike = (likeButton, cardId) => {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const likeCounter = likeButton.nextElementSibling;
  const likePromise = isLiked ? deleteLike(cardId) : addLike(cardId);

  likePromise
    .then((data) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCounter.textContent = data.likes.length;
    })
    .catch((err) => {
      console.error('Ошибка при добавлении/удалении лайка', err);
    });


  // // function to delete like
  // if (isLiked) {
  //   deleteLike(cardId)
  //     .then((data) => {
  //       likeButton.classList.remove('card__like-button_is-active');
  //       likeCounter.textContent = data.likes.length;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // } else {
  //   //function to add like
  //   addLike(cardId)
  //     .then((data) => {
  //       likeButton.classList.add('card__like-button_is-active');
  //       const likeCounter = likeButton.nextElementSibling;
  //       likeCounter.textContent = data.likes.length;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

}