import { data } from "autoprefixer";

const BASE_URL = 'https://nomoreparties.co/v1/wff-cohort-31';
const TOKEN = '12e41adc-4b52-40c9-925a-307db9623fc0';

const HEADERS = {
    headers: {
        'authorization': TOKEN,
        'Content-Type': 'application/json',
    },
};

// Функция проверки ответа
const checkResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
}

// Функция запроса
const request = (endpoint, options) =>
    fetch(`${BASE_URL}${endpoint}`, options)
        .then(checkResponse);

// Запрос на сервер информации о пользователе
export const getUserInfo = () =>
    request('/users/me', {
        ...HEADERS,
    });

// Запрос на сервер информации о карточках
export const getCards = () =>
    request('/cards', {
        ...HEADERS,
    });

// Изменение информации о пользователе
export const changeUserInfo = (user) =>
    request('/user/me', {
        method: 'PATCH',
        ...HEADERS,
        body: JSON.stringify({
            name: user.name,
            about: user.about,
        }),
    });

// Изменение карточки
export const changeCards = (card) => {
    request('/cards', {
        method: 'PATCH',
        ...HEADERS,
        body: JSON.stringify({
            name: card.name,
            link: card.link,
        }),
    });
}

// Добавление карточки на сервер
export const addCards = (card) => {
    request('/cards', {
        method: 'POST',
        ...HEADERS,
        body: JSON.stringify({
            name: card.name,
            link: card.link,
        }),
    });
}

// Удаление карточки с сервера
export const deleteCards = () => {
    request(`/cards/${cardId}`, {
        method: 'DELETE',
        ...HEADERS,
    });
}

// Добавление лайка
export const addLike = (cardId) => {
    request(`/cards/likes/${cardId}`, {
        method: 'PUT',
        ...HEADERS,
    })
    .then(checkResponse)
    .catch(err => {
        console.error('Возникла проблема с добавлением лайка', err);
        throw err;
    });
}

// Удаление лайка
export const deleteLike = (cardId) => {
    request(`/cards/likes/${cardId}`, {
        method: 'DELETE',
        ...HEADERS,
    })
    .then(checkResponse)
    .catch(err => {
        console.error('Возникла проблема с удалением лайка', err);
        throw err;
    });
}


// Изменение фото профиля
export const changeAvatar = (user) => {
    request('/user/me/avatar', {
        method: 'PATCH',
        ...HEADERS,
        body: JSON.stringify({
            avatar: user.avatar,
        }),
    });
}