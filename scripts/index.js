// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const cardList = content.querySelector('.places__list');
const addButton = content.querySelector('.profile__add-button'); 

// @todo: Функция создания карточки
//as argument should be card data and callback function for delete the card
function addCard(card, deleteCard) {

    //clone content of the card
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    //create variable for delete button
    const deleteButton = cardElement.querySelector('.card__delete-button');

    //set the value for nested elements
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = `На изображении ${card.name}`; 
   

    //add to delete-icone eventListner with a callback as an argument
    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
    })

    //not forget to return 
    return cardElement;
};

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
};

// @todo: Вывести карточки на страницу
const renderCards = (card) => {
    const cardElement = addCard(card, deleteCard);
    cardList.append(cardElement);
};

//use existing array initialCards
initialCards.forEach(card => {
    renderCards(card);
});
