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

        user_followUser(state, { user, rootState }) {
            if (rootState.auth.user._id === state.currentUser._id) {
                if (!state.following.find((item) => item._id === user._id)) {
                    state.following = [user, ...state.following];
                }

                if (
                    !state.currentUser.following.find(
                        (item) => item._id === user._id
                    )
                ) {
                    state.currentUser.following = [
                        user,
                        ...state.currentUser.following,
                    ];
                }
            } else {
                if (!state.followers.find((item) => item._id === user._id)) {
                    state.followers = [user, ...state.followers];
                }

                if (
                    !state.currentUser.followers.find(
                        (item) => item._id === user._id
                    )
                ) {
                    state.currentUser.followers = [
                        user,
                        ...state.currentUser.followers,
                    ];
                }
            }
        },

        user_unfollowUser(state, { user, rootState }) {
            if (rootState.auth.user._id === state.currentUser._id) {
                state.following = state.following.filter(
                    (item) => item._id !== user._id
                );

                state.currentUser.following =
                    state.currentUser.following.filter(
                        (item) => item._id !== user._id
                    );
            } else {
                state.followers = state.followers.filter(
                    (item) => item._id !== user._id
                );

                state.currentUser.followers =
                    state.currentUser.followers.filter(
                        (item) => item._id !== user._id
                    );
            }
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

        setShowUserListOverlay({ commit }, type) {
            commit('setShowUserListOverlay', type);
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

        followUser({ commit, rootState }, user) {
            commit('user_followUser', { user, rootState });
        },

        unfollowUser({ commit, rootState }, user) {
            commit('user_unfollowUser', { user, rootState });
        },

        logout({ commit }) {
            commit('setCurrentUser', null);
        },
    },
};
