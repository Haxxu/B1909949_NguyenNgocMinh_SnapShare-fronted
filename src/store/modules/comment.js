export default {
    state() {
        return {
            comments: [],
            currentComment: null,
            isShowCurrentCommentOptionsOverlay: false,
        };
    },

    mutations: {
        setComments(state, comments) {
            state.comments = comments;
        },

        likeComment(state, comment) {
            state.comments = state.comments.map((item) =>
                item._id === comment._id ? comment : item
            );
        },

        createComment(state, comment) {
            state.comments = [comment, ...state.comments];
        },

        deleteComment(state, commentId) {
            state.comments = state.comments.filter(
                (item) => item._id !== commentId
            );
        },

        setShowCurrentCommentOptionsOverlay(state, data) {
            state.isShowCurrentCommentOptionsOverlay = data;
        },

        setCurrentComment(state, comment) {
            state.currentComment = comment;
        },

        removeCurrentComment(state) {
            state.currentComment = null;
        },

        removeComments(state) {
            state.comments = [];
        },
    },

    actions: {
        fetchComments({ commit }, comments) {
            commit('setComments', comments);
        },

        likeComment({ commit }, comment) {
            commit('likeComment', comment);
        },

        createComment({ commit }, comment) {
            commit('createComment', comment);
        },

        deleteComment({ commit }, commentId) {
            commit('deleteComment', commentId);
        },

        setShowCurrentCommentOptionsOverlay({ commit }, data) {
            commit('setShowCurrentCommentOptionsOverlay', data);
        },

        setCurrentComment({ commit }, comment) {
            commit('setCurrentComment', comment);
        },

        removeCurrentComment({ commit }) {
            commit('removeCurrentComment');
        },

        removeComments({ commit }) {
            commit('removeComments');
        },
    },
};
