import axiosInstance from '../api/axiosInstance';
import { searchUrl } from '../api/urls';

class SearchService {
    async search(store, search, limit) {
        var array = [];
        try {
            const res = await axiosInstance.get(searchUrl(), {
                params: {
                    search,
                    limit,
                    tags: ['posts'],
                },
            });
            if (res.status < 400) {
                array = res.data.data.users;
            }

            return array;
        } catch (error) {
            if (error.response && error.response.status >= 400) {
            } else {
                console.log(error);
            }
            return [];
        }
    }
}

export default new SearchService();
