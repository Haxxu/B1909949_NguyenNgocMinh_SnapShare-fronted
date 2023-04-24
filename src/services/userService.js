import { toast } from 'vue3-toastify';
import axiosInstance from '../api/axiosInstance';
import {
    getFollowersByUserIdUrl,
    getFollowingByUserIdUrl,
    getUserByIdUrl,
    updateUserByIdUrl,
} from '../api/urls';

class UserService {
    async fetchCurrentUserByUserId(store, userId) {
        try {
            const res = await axiosInstance.get(getUserByIdUrl(userId));
            if (res.status === 200) {
                store.dispatch('setCurrentUser', res.data.data.user);
            }
            return false;
        } catch (error) {
            if (error.response && error.response.status >= 400) {
            } else {
                console.log(error);
            }
        }
    }

    async fetchFollowingByUserId(store, userId) {
        try {
            const res = await axiosInstance.get(
                getFollowingByUserIdUrl(userId)
            );
            if (res.status === 200) {
                store.dispatch('fetchFollowing', res.data.data);
            }
        } catch (error) {
            if (error.response && error.response.status >= 400) {
            } else {
                console.log(error);
            }
        }
    }

    async fetchFollowersByUserId(store, userId) {
        try {
            const res = await axiosInstance.get(
                getFollowersByUserIdUrl(userId)
            );
            if (res.status === 200) {
                store.dispatch('fetchFollowers', res.data.data);
                return true;
            }
        } catch (error) {
            if (error.response && error.response.status >= 400) {
                // toast.error(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    }

    async updateUserById(store, userId, name, description, image) {
        try {
            const res = await axiosInstance.patch(updateUserByIdUrl(userId), {
                name,
                description,
                image,
            });
            if (res.status === 200) {
                store.dispatch('updateUser', res.data.data);
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

export default new UserService();
