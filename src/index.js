import Vue from 'vue';
import VeeValidate from 'vee-validate';
import ImageUploader from 'vue-image-upload-resize';

import { store } from './store';
import { router } from './helpers';
import App from './app/App';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import { configureFakeBackend } from './fake-backend/main';

Vue.use(VeeValidate);
Vue.use(ImageUploader);

if ('serviceWorker' in navigator) {
    runtime.register();
}

configureFakeBackend();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});