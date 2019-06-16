

import  { userRouter } from './users/route.users'
import  { franchaiseRouter } from './franchaises/route.franchaises'

export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                try {
                    //user routes
                    if (url.match(/users/)) {
                        const response = userRouter().setRoutes({ url, opts });
                        return resolve(response);
                    };
                    //franchaises routes
                    if (url.match(/franchaises/)) {
                        const response = franchaiseRouter().setRoutes({ url, opts });
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