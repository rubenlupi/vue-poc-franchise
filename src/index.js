import Vue from 'vue';
import VeeValidate from 'vee-validate';
import ImageUploader from 'vue-image-upload-resize';

import { store } from './store';
import { router } from './helpers';
import App from './app/App';

Vue.use(VeeValidate);
Vue.use(ImageUploader);

// setup fake backend
import { configureFakeBackend } from './fake-backend/main';
configureFakeBackend();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});