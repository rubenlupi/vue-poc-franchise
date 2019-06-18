import  { franchiseService } from './service.franchises'
import { commonService } from '../common'

export function franchiseRouter() {
    const setRoutes = ({ url, opts }) => {
        // get franchises
        if (url.endsWith('/franchises') && opts.method === 'GET') {
            commonService().verifyToken(opts.headers);
            let franchises = commonService().getLocalStorage('franchises');
            return franchiseService().getAll(franchises)
        };
        // get franchises by id
        if (url.match(/\/franchises\/\d+$/) && opts.method === 'GET') {
            commonService().verifyToken(opts.headers);
            let franchises = commonService().getLocalStorage('franchises');
            const id = commonService().getIdUrl(url);
            return franchiseService().getById({ franchises, id });
        };
        // update franchises
        if (url.endsWith('/franchises') && opts.method === 'PUT') {
            commonService().verifyToken(opts.headers);
            let franchises = commonService().getLocalStorage('franchises');
            const id = commonService().getIdUrl(url);
            return franchiseService().update({ franchises, id });
        };
    };

    return {
        setRoutes
    }
}

