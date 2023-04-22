import { createStore } from 'vuex';
import auth from './modules/auth';
import post from './modules/post';

const store = createStore({
    modules: {
        auth,
        post,
    },
});

export default store;
