

import  { userRouter } from './users/route.users'
import  { franchiseService } from './franchises/service.franchises'
import { getFranchisesMocked } from './franchises/mock.fanchises'
import  { franchiseRouter } from './franchises/route.franchises'
import  { commonService } from './common'

const initDefaultFranchises = () => {
    let franchises = commonService().getLocalStorage('franchises');
    if (franchises.length) return;
    const franchisesMocked = getFranchisesMocked();
    franchisesMocked.forEach(item => {
        let franchises = commonService().getLocalStorage('franchises');
        franchiseService().create({ franchises, newFranchise: item });
    });
};

export function configureFakeBackend() {
    let realFetch = window.fetch;
    initDefaultFranchises();
    window.fetch = (url, opts) => {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                try {
                    //user routes
                    if (url.match(/users/)) {
                        const response = userRouter().setRoutes({ url, opts });
                        return resolve(response);
                    };
                    //franchises routes
                    if (url.match(/franchises/)) {
                        const response = franchiseRouter().setRoutes({ url, opts });
                        return resolve(response);
                    };

                } catch (err) {
                    reject(err);
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}