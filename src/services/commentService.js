import { toast } from 'vue3-toastify';
import axiosInstance from '../api/axiosInstance';
import { getCommentsByPostIdUrl } from '../api/urls';

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
}

export default new CommentService();
