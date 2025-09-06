
const BASE_URL = 'https://nomoreparties.co/v1/wff-cohort-31';
const TOKEN = '12e41adc-4b52-40c9-925a-307db9623fc0';

const HEADERS = {
    headers: {
        'authorization': TOKEN,
        'Content-Type': 'application/json',
    },
};

const checkResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
}

const request = (endpoint, options) =>
    fetch(`${BASE_URL}${endpoint}`, options)
        .then(checkResponse);

// Ask to server for user info
export const getUserInfo = () =>
    request('/users/me', {
        ...HEADERS,
    });

// Ask to server for cards info
export const getCards = () =>
    request('/cards', {
        ...HEADERS,
    });

// Function to change user info
export const changeUserInfo = (user) =>
    request('/users/me', {
        method: 'PATCH',
        headers: {
            'authorization': TOKEN,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: user.name,
            about: user.about,
        }),
    });

// Function to change card
export const changeCards = (card) => {
    return request('/cards', {
        method: 'PATCH',
        ...HEADERS,
        body: JSON.stringify({
            name: card.name,
            link: card.link,
        }),
    });
}

// Function to add card to server
export const addCard = (card) => {
    return request('/cards', {
        method: 'POST',
        ...HEADERS,
        body: JSON.stringify({
            name: card.name,
            link: card.link
        }),
    });
}

// Function to delete card from server
export const deleteCards = (cardId) => {
    return request(`/cards/${cardId}`, {
        method: 'DELETE',
        ...HEADERS,
    });
}

// Function to add like
export const addLike = (cardId) => {
    return request(`/cards/${cardId}/likes`, {
        method: 'PUT',
        ...HEADERS,
    });
}


// Function to delete like
export const deleteLike = (cardId) => {
        return request(`/cards/${cardId}/likes`, {
            method: 'DELETE',
            ...HEADERS,
        });
}



// Function to change profile image
export const changeAvatar = (avatarData) => {
    return request('/users/me/avatar', {
        method: 'PATCH',
        headers: {
            'authorization': TOKEN,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            avatar: avatarData.avatar
        }),
    });
}

