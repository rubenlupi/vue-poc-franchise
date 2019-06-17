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

    const getNewId = (collection) => {
        return collection.length ? Math.max(...collection.map(item => item.id)) + 1 : 1;
    }

    const isDuplicated = ({ collection, register, property }) => {
        try {
            return collection.filter(item => item[property] === register[property]).length;
        } catch (err) {
            throw err;
        }
    };

    return {
        getLocalStorage,
        verifyToken,
        getIdUrl,
        getNewId,
        isDuplicated
    }
};