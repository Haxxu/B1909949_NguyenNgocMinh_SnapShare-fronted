import { createApp } from 'vue';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { Quasar } from 'quasar';

// Import icon libraries
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css';
import '@quasar/extras/material-icons/material-icons.css';
// Import Quasar css
import 'quasar/src/css/index.sass';

import App from './App.vue';
import router from './router';
import store from '@/store';

const app = createApp(App);

app.use(Quasar, {
    plugins: {},
});
app.use(Vue3Toastify, { autoClose: 500 });
app.use(store);
app.use(router);

app.mount('#app');
