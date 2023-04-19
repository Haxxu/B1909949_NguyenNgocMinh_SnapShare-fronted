import { createApp } from 'vue';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import App from './App.vue';
import router from './router';
import store from '@/store';

const app = createApp(App);

app.use(Vue3Toastify, { autoClose: 500 });
app.use(store);
app.use(router);

app.mount('#app');
