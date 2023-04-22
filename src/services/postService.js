import { toast } from 'vue3-toastify';

import axiosInstance from '../api/axiosInstance';
import {
    createPostUrl,
    getPostsByTagsUrl,
    getSavedPostsUrl,
    handleLikePostUrl,
    handleSavePostUrl,
} from '@/api/urls';

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

    async fetchHomePosts(store) {
        try {
            const res = await axiosInstance.get(getPostsByTagsUrl(), {
                params: {
                    limit: 25,
                    tags: ['random', 'following'],
                },
            });
            if (res.status < 400) {
                const posts = mergeAndShuffle(
                    res.data.data.following,
                    res.data.data.random
                );
                store.dispatch('fetchHomePosts', posts);
            }
        } catch (error) {
            if (error.response && error.response.status >= 400) {
                // toast.error(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    }

    async fetchSavedPosts(store) {
        try {
            const res = await axiosInstance.get(getSavedPostsUrl());
            if (res.status < 400) {
                store.dispatch('fetchSavedPosts', res.data.data);
            }
        } catch (error) {
            if (error.response && error.response.status >= 400) {
                // toast.error(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    }

    async likePost(store, post) {
        try {
            const res = await axiosInstance.put(handleLikePostUrl(), {
                post: post._id,
            });
            if (res.status < 400) {
                store.dispatch('likePost', res.data.data);
            }
        } catch (error) {
            if (error.response && error.response.status >= 400) {
                toast.error(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    }

    async unlikePost(store, post) {
        try {
            const res = await axiosInstance.delete(handleLikePostUrl(), {
                data: {
                    post: post?._id,
                },
            });
            if (res.status < 400) {
                store.dispatch('likePost', res.data.data);
            }
        } catch (error) {
            if (error.response && error.response.status >= 400) {
                toast.error(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    }

    async savePost(store, post) {
        try {
            // console.log('save post');
            const res = await axiosInstance.put(handleSavePostUrl(), {
                post: post._id,
            });
            if (res.status < 400) {
                store.dispatch('savePost', res.data.data);
            }
        } catch (error) {
            if (error.response && error.response.status >= 400) {
                toast.error(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    }

    async unsavePost(store, post) {
        try {
            const res = await axiosInstance.delete(handleSavePostUrl(), {
                data: {
                    post: post?._id,
                },
            });
            if (res.status < 400) {
                store.dispatch('unsavePost', res.data.data);
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

function mergeAndShuffle(arr1, arr2) {
    const merged = arr1.concat(arr2); // Merge the two arrays
    for (let i = merged.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index within the range of the remaining elements
        [merged[i], merged[j]] = [merged[j], merged[i]]; // Swap the current element with the randomly selected element
    }
    return merged;
}

export default new PostService();
