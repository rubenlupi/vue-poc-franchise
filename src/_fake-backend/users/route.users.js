import  { userService } from './service.users'
import { commonService } from '../common'

export function userRouter() {

    const setRoutes = ({ url, opts }) => {
        // authenticate
        if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
            let params = JSON.parse(opts.body);
            let users = commonService().getLocalStorage('users');
            return userService().authenticate({users, ...params});
        };
        // get users
        if (url.endsWith('/users') && opts.method === 'GET') {
            commonService().verifyToken(opts.headers);
            let users = commonService().getLocalStorage('users');
            return userService().getAll(users)
        };
        // get user by id
        if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
            commonService().verifyToken(opts.headers);
            const id = commonService().getIdUrl(url);
            let users = commonService().getLocalStorage('users');
            return userService().getById({ users, id });
        };
        // register user
        if (url.endsWith('/users/register') && opts.method === 'POST') {
            console.log('registering user', opts.body);
            let users = commonService().getLocalStorage('users');
            let newUser = JSON.parse(opts.body);
            return userService().register({ users, newUser });
        };
        // delete user
        if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE') {
            commonService().verifyToken(opts.headers);
            const id = commonService().getIdUrl(url);
            return userService().deleteUser({ users, id });
        };
    };

    return {
        setRoutes
    }
}

