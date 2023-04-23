import { createStore } from 'vuex';
import auth from './modules/auth';
import post from './modules/post';
import comment from './modules/comment';

const store = createStore({
    modules: {
        auth,
        post,
        comment,
    },
});

export default store;
