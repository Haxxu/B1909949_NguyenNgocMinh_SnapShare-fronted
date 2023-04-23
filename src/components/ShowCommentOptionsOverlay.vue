<template>
    <div
        class="fixed flex items-center z-50 top-0 left-0 w-full h-screen bg-[#000000] bg-opacity-60 p-3"
    >
        <div
            class="w-full max-w-sm mx-auto mt-10 text-center bg-white rounded-xl"
        >
            <button
                @click="deleteComment"
                class="w-full p-3 text-lg font-extrabold text-red-600 border-b cursor-pointer border-b-gray-300"
            >
                Delete Comment
            </button>

            <div class="p-3 text-lg cursor-pointer" @click="closeOverlay">
                Cancel
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import postService from '../services/postService';
import commentService from '../services/commentService';
export default {
    name: 'ShowPostOptionsOverlay',
    props: {
        comment: {
            type: Object,
        },
    },
    setup(props) {
        const store = useStore();

        const closeOverlay = () => {
            store.dispatch('setShowCurrentCommentOptionsOverlay', false);
        };

        const deleteComment = async () => {
            commentService.deleteComment(store, props.comment._id);
        };

        return { closeOverlay, deleteComment };
    },
};
</script>
