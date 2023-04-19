export default {
    state() {
        return {
            token: localStorage.getItem('snapshare-x-auth-token') || null,
            isLoggedIn: false,
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
        },
    },

    actions: {
        login({ commit }, token) {
            localStorage.setItem('snapshare-x-auth-token', token);
            commit('setAuthToken', token);
        },

        signup({ commit }, token) {
            localStorage.setItem('snapshare-x-auth-token', token);
            commit('setAuthToken', token);
        },

        logout({ commit }) {
            localStorage.removeItem('snapshare-x-auth-token');
            commit('removeAuthToken');
        },
    },

    getters: {
        isAuthenticated(state) {
            return state.isLoggedIn;
        },
    },
};
