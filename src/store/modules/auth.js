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

        auth_followUser(state, user) {
            if (
                !state.user.following.find((item) => item.user_id === user._id)
            ) {
                state.user.following = [
                    { user_id: user._id, added_at: user.updatedAt },
                    ...state.user.following,
                ];
            }
        },

        auth_unfollowUser(state, user) {
            state.user.following = state.user.following.filter(
                (item) => item.user_id !== user._id
            );
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

        followUser({ commit }, user) {
            commit('auth_followUser', user);
        },

        unfollowUser({ commit }, user) {
            commit('auth_unfollowUser', user);
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
