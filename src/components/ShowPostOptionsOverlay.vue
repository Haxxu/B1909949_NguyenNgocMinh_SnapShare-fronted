<template>
    <div
        class="fixed flex items-center z-40 top-0 left-0 w-full h-screen bg-[#000000] bg-opacity-60 p-3"
    >
        <div
            class="w-full max-w-sm mx-auto mt-10 text-center bg-white rounded-xl"
        >
            <button
                @click="deletePost"
                class="w-full p-3 text-lg font-extrabold text-red-600 border-b cursor-pointer border-b-gray-300"
            >
                Delete Post
            </button>
            <div
                class="p-3 text-lg border-b cursor-pointer border-b-gray-300"
                @click="openEditPostOverlay"
            >
                Edit Post
            </div>
            <div class="p-3 text-lg cursor-pointer" @click="closeOverlay">
                Cancel
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import postService from '../services/postService';
export default {
    name: 'ShowPostOptionsOverlay',
    props: {
        post: {
            type: Object,
        },
    },
    setup(props) {
        const store = useStore();

        const closeOverlay = () => {
            store.dispatch('setShowCurrentPostOptionsOverlay', false);
        };

        const openEditPostOverlay = () => {
            store.dispatch('setShowEditCurrentPostOverlay', true);
            store.dispatch('setShowCurrentPostOptionsOverlay', false);
        };

        const deletePost = async () => {
            await postService.deletePostById(store, props.post._id);
        };

        return { closeOverlay, deletePost, openEditPostOverlay };
    },
};
</script>
