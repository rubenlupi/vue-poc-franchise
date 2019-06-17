import { commonService } from '../common'

export function userService() {

    const authenticate = ({ users, username, password }) => {
        try {
            // find if any user matches login credentials
            const filteredUsers = users.filter(user => {
                return user.username === username && user.password === password;
            });
            // if no user matches throw authentication error
            if (!filteredUsers.length) throw new Error();
            // if login details are valid return user details and fake jwt token
            const user = filteredUsers[0];
            const responseJson = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
                token: 'fake-jwt-token'
            };
            return { ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) };
        } catch (err) {
            throw new Error('Username or password is incorrect');
        }
    };

    const getAll = (users) => {
        try {
            return { ok: true, text: () => Promise.resolve(JSON.stringify(users))};
        } catch (err) {
            throw err;
        }
    };

    const getById = ({ users, id }) => {
        try {
            const matchedUsers = users.filter(user => { return user.id === id; });
            let user = matchedUsers.length ? matchedUsers[0] : null;
            console.log('user info', user);
            return { ok: true, text: () => Promise.resolve(JSON.stringify(user))};
        } catch (err) {
            throw err;
        }
    };

    const register = ({ users, newUser }) => {
        try {
            if (commonService().isDuplicated({ collection: users, register: newUser, property: 'username' }))
                throw new Error('Username "' + newUser.username + '" is already taken');
            newUser.id = commonService().getNewId(users);
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            return { ok: true, text: () => Promise.resolve() };
        } catch (err) {
            throw err;
        }
    };

    const deleteUser = ({ users, id }) => {
        try {
            // find user by id in users array
            for (let i = 0; i < users.length; i++) {
                let user = users[i];
                if (user.id === id) {
                    // delete user
                    users.splice(i, 1);
                    localStorage.setItem('users', JSON.stringify(users));
                    break;
                }
            }
            return { ok: true, text: () => Promise.resolve(JSON.stringify(users)) };
        } catch (err) {
            throw err;
        }
    };

    return {
        authenticate,
        getAll,
        getById,
        register,
        deleteUser
    };
};


