import { createStore } from 'vuex';
import auth from './modules/auth';
import post from './modules/post';
import comment from './modules/comment';
import user from './modules/user';

const store = createStore({
    modules: {
        auth,
        post,
        comment,
        user,
    },
});

export default store;
