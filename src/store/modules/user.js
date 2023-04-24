export default {
    state() {
        return {
            currentUser: null,
            following: [],
            followers: [],
            isShowUserListOverlay: false,
            showUserListType: '',
            isShowEditProfileOverlay: false,
        };
    },

    mutations: {
        setFollowing(state, users) {
            state.following = users;
        },

        setFollowers(state, users) {
            state.followers = users;
        },

        setCurrentUser(state, user) {
            state.currentUser = user;
        },

        setShowUserListOverlay(state, type) {
            state.isShowUserListOverlay = true;
            state.showUserListType = type;
        },

        removeShowUserListOverlay(state) {
            state.isShowUserListOverlay = false;
            state.showUserListType = '';
        },

        setShowEditProfileOverlay(state) {
            state.isShowEditProfileOverlay = true;
        },

        removeShowEditProfileOverlay(state) {
            state.isShowEditProfileOverlay = false;
        },

        updateUser(state, user) {
            state.currentUser = {
                ...state.currentUser,
                image: user.image,
                name: user.name,
                description: user.description,
            };
        },
    },

    actions: {
        fetchFollowing({ commit }, users) {
            commit('setFollowing', users);
        },

        fetchFollowers({ commit }, users) {
            commit('setFollowers', users);
        },

        setCurrentUser({ commit }, user) {
            commit('setCurrentUser', user);
        },

        setShowUserListOverlay({ commit }) {
            commit('setShowEditProfileOverlay');
        },

        removeShowUserListOverlay({ commit }) {
            commit('removeShowUserListOverlay');
        },

        setShowEditProfileOverlay({ commit }) {
            commit('setShowEditProfileOverlay');
        },

        removeShowEditProfileOverlay({ commit }) {
            commit('removeShowEditProfileOverlay');
        },

        updateUser({ commit }, user) {
            commit('updateUser', user);
        },
    },
};
