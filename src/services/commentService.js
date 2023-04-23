import { toast } from 'vue3-toastify';
import axiosInstance from '../api/axiosInstance';

import {
    createCommentUrl,
    getCommentsByPostIdUrl,
    handleLikeCommentUrl,
    deleteCommentByIdUrl,
} from '../api/urls';

class CommentService {
    async getCommentByPostId(postId) {
        let comments = [];
        try {
            const res = await axiosInstance.get(getCommentsByPostIdUrl(postId));

            if (res.status < 400) {
                comments = res.data.data;
            }
        } catch (error) {
            if (error.response && error.response.status >= 400) {
                // toast.error(error.response.data.message);
            } else {
                console.log(error);
            }
        }
        return comments;
    }

    async createComment(store, postId, content) {
        try {
            const res = await axiosInstance.post(createCommentUrl(), {
                post: postId,
                content,
            });
            if (res.status < 400) {
                store.dispatch('createComment', res.data.data);
                store.dispatch('addCommentToPost', {
                    postId,
                    comment: res.data.data,
                });
            }
        } catch (error) {
            if (error.response && error.response.status >= 400) {
                toast.error(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    }

    async deleteComment(store, commentId) {
        try {
            const res = await axiosInstance.delete(
                deleteCommentByIdUrl(commentId)
            );
            if (res.status < 400) {
                store.dispatch('deleteComment', commentId);
                store.dispatch('removeCommentFromPost', {
                    postId: res.data.data.post,
                    commentId: res.data.data._id,
                });
                store.dispatch('setShowCurrentCommentOptionsOverlay', false);
                store.dispatch('removeCurrentComment');
            }
        } catch (error) {
            if (error.response && error.response.status >= 400) {
                toast.error(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    }

    async likeComment(store, comment) {
        try {
            const res = await axiosInstance.put(handleLikeCommentUrl(), {
                comment: comment?._id,
            });
            if (res.status < 400) {
                store.dispatch('likeComment', res.data.data);
            }
        } catch (error) {
            if (error.response && error.response.status >= 400) {
                toast.error(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    }

    async unlikeComment(store, comment) {
        try {
            const res = await axiosInstance.delete(handleLikeCommentUrl(), {
                data: {
                    comment: comment?._id,
                },
            });
            if (res.status < 400) {
                store.dispatch('likeComment', res.data.data);
            }
        } catch (error) {
            if (error.response && error.response.status >= 400) {
                toast.error(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    }
}

export default new CommentService();
