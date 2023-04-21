import { toast } from 'vue3-toastify';

import axiosInstance from '@/api/axiosInstance';
import { createPostUrl } from '@/api/urls';

class PostService {
    async createPost(title, description, image) {
        try {
            const res = await axiosInstance.post(createPostUrl(), {
                title,
                description,
                image,
            });
            if (res.status === 200) {
                toast.success(res.data.message);
                return true;
            }
            toast.error(res.data.message);
            return false;
        } catch (error) {
            if (error.response && error.response.status >= 400) {
                toast.error(error.response.data.message);
            } else {
                console.log(error);
            }
            return false;
        }
    }
}

export default new PostService();
