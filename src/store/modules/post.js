export default {
    state() {
        return {
            posts: [],
            homePosts: [],
            savedPosts: [],
            currentPost: null,
            isShowCurrentPostOverlay: false,
            isShowCurrentPostOptionsOverlay: false,
            isShowEditCurrentPostOverlay: false,
        };
    },

    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },

        setHomePosts(state, posts) {
            state.homePosts = posts;
        },

        setSavedPosts(state, posts) {
            state.savedPosts = posts;
        },

        setCurrentPost(state, post) {
            state.currentPost = post;
        },

        removeCurrentPost(state) {
            state.currentPost = null;
        },

        setShowCurrentPostOverlay(state, data) {
            state.isShowCurrentPostOverlay = data;
        },

        setShowCurrentPostOptionsOverlay(state, data) {
            state.isShowCurrentPostOptionsOverlay = data;
        },

        setShowEditCurrentPostOverlay(state, data) {
            state.isShowEditCurrentPostOverlay = data;
        },

        deletePost(state, postId) {
            state.posts = state.posts.filter((item) => item._id !== postId);
            state.savedPosts = state.savedPosts.filter(
                (item) => item._id !== postId
            );
            state.homePosts = state.homePosts.filter(
                (item) => item._id !== postId
            );
            state.isShowCurrentPostOverlay = false;
            state.isShowCurrentPostOptionsOverlay = false;
            state.currentPost = null;
        },

        likePost(state, post) {
            state.posts = state.posts.map((item) =>
                item._id === post._id ? post : item
            );

            state.savedPosts = state.savedPosts.map((item) =>
                item._id === post._id ? post : item
            );

            state.homePosts = state.homePosts.map((item) =>
                item._id === post._id ? post : item
            );

            // Them ngoai le like vi khi like/unlike no chi cap nhat ben state.posts chu khong cap nhat state.currentPost
            if (state.currentPost && state.currentPost?._id === post._id) {
                state.currentPost = post;
            }
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

        updatePost(state, post) {
            state.posts = state.posts.map((item) =>
                item._id === post._id ? post : item
            );
            state.savedPosts = state.savedPosts.map((item) =>
                item._id === post._id ? post : item
            );
            state.homePosts = state.homePosts.map((item) =>
                item._id === post._id ? post : item
            );
            state.isShowEditCurrentPostOverlay = false;
        },

        // payload = {postId, comments}
        addCommentsToPost(state, payload) {
            state.posts = state.posts.map((item) =>
                item._id !== payload.postId
                    ? item
                    : { ...item, comments: payload.comments }
            );
            state.savedPosts = state.savedPosts.map((item) =>
                item._id !== payload.postId
                    ? item
                    : { ...item, comments: payload.comments }
            );
            state.homePosts = state.homePosts.map((item) =>
                item._id !== payload.postId
                    ? item
                    : { ...item, comments: payload.comments }
            );
        },
        // payload = {postId, comment}
        addCommentToPost(state, payload) {
            state.posts = state.posts.map((item) =>
                item._id !== payload.postId
                    ? item
                    : {
                          ...item,
                          comments: [payload.comment, ...item.comments],
                      }
            );
            state.savedPosts = state.savedPosts.map((item) =>
                item._id !== payload.postId
                    ? item
                    : {
                          ...item,
                          comments: [payload.comment, ...item.comments],
                      }
            );
            state.homePosts = state.homePosts.map((item) =>
                item._id !== payload.postId
                    ? item
                    : {
                          ...item,
                          comments: [payload.comment, ...item.comments],
                      }
            );
        },

        removeCommentFromPost(state, payload) {
            state.posts = state.posts.map((item) =>
                item._id !== payload.postId
                    ? item
                    : {
                          ...item,
                          comments: item.comments.filter(
                              (i) => i._id !== payload.commentId
                          ),
                      }
            );
            state.savedPosts = state.savedPosts.map((item) =>
                item._id !== payload.postId
                    ? item
                    : {
                          ...item,
                          comments: item.comments.filter(
                              (i) => i._id !== payload.commentId
                          ),
                      }
            );
            state.homePosts = state.homePosts.map((item) =>
                item._id !== payload.postId
                    ? item
                    : {
                          ...item,
                          comments: item.comments.filter(
                              (i) => i._id !== payload.commentId
                          ),
                      }
            );
        },
    },

    actions: {
        fetchHomePosts({ commit }, posts) {
            commit('setHomePosts', posts);
        },

        fetchPostsByUser({ commit }, posts) {
            commit('setPosts', posts);
        },

        fetchSavedPosts({ commit }, posts) {
            commit('setSavedPosts', posts);
        },

        setCurrentPost({ commit }, post) {
            commit('setCurrentPost', post);
        },

        setPosts({ commit }, posts) {
            commit('setPosts', posts);
        },

        removeCurrentPost({ commit }) {
            commit('removeCurrentPost');
        },

        setShowCurrentPostOverlay({ commit }, data) {
            commit('setShowCurrentPostOverlay', data);
        },

        setShowCurrentPostOptionsOverlay({ commit }, data) {
            commit('setShowCurrentPostOptionsOverlay', data);
        },

        setShowEditCurrentPostOverlay({ commit }, data) {
            commit('setShowEditCurrentPostOverlay', data);
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

        deletePost({ commit }, postId) {
            commit('deletePost', postId);
        },

        updatePost({ commit }, post) {
            commit('updatePost', post);
        },

        addCommentsToPost({ commit }, payload) {
            commit('addCommentsToPost', payload);
        },

        addCommentToPost({ commit }, payload) {
            commit('addCommentToPost', payload);
        },

        removeCommentFromPost({ commit }, payload) {
            commit('removeCommentFromPost', payload);
        },
    },

    getters: {
        // isAuthenticated(state) {
        //     return state.isLoggedIn;
        // },
    },
};
