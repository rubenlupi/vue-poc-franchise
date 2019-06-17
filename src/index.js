import Vue from 'vue';
import VeeValidate from 'vee-validate';
import ImageUploader from 'vue-image-upload-resize';

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';

Vue.use(VeeValidate);
Vue.use(ImageUploader);

// setup fake backend
import { configureFakeBackend } from './_fake-backend/main';
configureFakeBackend();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});