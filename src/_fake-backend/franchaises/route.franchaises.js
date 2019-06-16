import  { franchaiseService } from './service.franchaises'
import { commonService } from '../common'

export function franchaiseRouter() {
    const setRoutes = ({ url, opts }) => {
        // get franchaises
        if (url.endsWith('/franchaises') && opts.method === 'GET') {
            commonService().verifyToken(opts.headers);
            let franchaises = commonService().getLocalStorage('franchaises');
            return franchaiseService().getAll(franchaises)
        };
        // get franchaises by id
        if (url.match(/\/franchaises\/\d+$/) && opts.method === 'GET') {
            commonService().verifyToken(opts.headers);
            let franchaises = commonService().getLocalStorage('franchaises');
            const id = getIdUrl(url);
            return franchaiseService().getById({ franchaises, id });
        };
        // update franchaises
        if (url.endsWith('/franchaises') && opts.method === 'POST') {
            commonService().verifyToken(opts.headers);
            let franchaises = commonService().getLocalStorage('franchaises');
            const id = getIdUrl(url);
            return franchaiseService().update({ franchaises, id });
        };
    };

    return {
        setRoutes
    }
}

