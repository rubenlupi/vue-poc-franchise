import config from 'config';
import { authHeader } from '../helpers';

export const franchiseService = {
    getAll,
    getById
};

function logout() {
    localStorage.removeItem('user');
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/franchises`, requestOptions).then(handleResponse);
};

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/franchises/${id}`, requestOptions).then(handleResponse);
};

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                location.reload(true);
            };
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        };
        return data;
    });
};