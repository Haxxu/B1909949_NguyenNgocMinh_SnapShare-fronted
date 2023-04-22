export default {
    state() {
        return {
            posts: [],
            savedPosts: [],
        };
    },

    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },

        setSavedPosts(state, posts) {
            state.savedPosts = posts;
        },

        likePost(state, post) {
            state.posts = state.posts.map((item) =>
                item._id === post._id ? post : item
            );
        },

        savePost(state, post) {
            if (!state.savedPosts.find((item) => item._id === post._id)) {
                state.savedPosts = [post, ...state.savedPosts];
            }
        },

        unsavePost(state, post) {
            state.savedPosts = state.savedPosts.filter(
                (item) => item._id !== post._id
            );
        },
    },

    actions: {
        fetchHomePosts({ commit }, posts) {
            commit('setPosts', posts);
        },

        fetchSavedPosts({ commit }, posts) {
            commit('setSavedPosts', posts);
        },

        likePost({ commit }, post) {
            commit('likePost', post);
        },

        savePost({ commit }, post) {
            commit('savePost', post);
        },

        unsavePost({ commit }, post) {
            commit('unsavePost', post);
        },
    },

    getters: {
        // isAuthenticated(state) {
        //     return state.isLoggedIn;
        // },
    },
};
