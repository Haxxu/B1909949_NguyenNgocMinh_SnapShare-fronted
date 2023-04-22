export default {
    state() {
        return {
            token: localStorage.getItem('snapshare-x-auth-token') || null,
            isLoggedIn: localStorage.getItem('snapshare-isLoggedIn') || false,
            user: null,
        };
    },

    mutations: {
        setAuthToken(state, token) {
            state.token = token;
            state.isLoggedIn = true;
        },

        removeAuthToken(state) {
            state.token = null;
            state.isLoggedIn = false;
            state.user = null;
        },

        setUser(state, user) {
            state.user = user;
        },
    },

    actions: {
        login({ commit }, token) {
            localStorage.setItem('snapshare-x-auth-token', token);
            localStorage.setItem('snapshare-isLoggedIn', true);
            commit('setAuthToken', token);
        },

        signup({ commit }, token) {
            localStorage.setItem('snapshare-x-auth-token', token);
            localStorage.setItem('snapshare-isLoggedIn', true);
            commit('setAuthToken', token);
        },

        logout({ commit }) {
            localStorage.removeItem('snapshare-x-auth-token');
            localStorage.removeItem('snapshare-isLoggedIn');
            commit('removeAuthToken');
        },

        fetchUser({ commit }, user) {
            commit('setUser', user);
        },
    },

    getters: {
        isAuthenticated(state) {
            return state.isLoggedIn;
        },
        getUser(state) {
            return state.user;
        },
    },
};
