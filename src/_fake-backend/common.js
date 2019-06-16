export function commonService() {
    const getLocalStorage = (field) => {
        // array in local storage for registered users
        return JSON.parse(localStorage.getItem(field)) || [];
    };

    const verifyToken = (headers) => {
        if (headers && headers.Authorization !== 'Bearer fake-jwt-token') throw new Error('Unauthorised');
    };

    const getIdUrl = (url) => {
        const urlParts = url.split('/');
        return parseInt(urlParts[urlParts.length - 1]);
    };

    return {
        getLocalStorage,
        verifyToken,
        getIdUrl
    }
};