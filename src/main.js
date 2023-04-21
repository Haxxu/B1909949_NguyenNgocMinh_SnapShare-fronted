import { createApp } from 'vue';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// Import Quasar css
import { Quasar } from 'quasar';
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

import 'tailwindcss/tailwind.css';

import App from './App.vue';
import router from './router';
import store from '@/store';

const app = createApp(App);

// FontawesomeIcon
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './assets/icon/libraryFontAwesome';
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(Quasar, {
    plugins: {},
});
app.use(Vue3Toastify, { autoClose: 500 });
app.use(store);
app.use(router);

app.mount('#app');
