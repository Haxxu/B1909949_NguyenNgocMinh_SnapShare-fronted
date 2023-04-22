<template>
    <button @click="handleSave" class="-mt-[14px]">
        <BookMarkOutline
            v-if="!isSaved"
            class="pl-2 cursor-pointer"
            :size="30"
        />
        <BookMark
            v-else
            class="pl-2 cursor-pointer"
            fillColor="#000"
            :size="30"
        />
    </button>
    <!-- <div class="d-flex justify-center align-items-center"></div> -->
</template>

<script>
import { computed, watch } from 'vue';
import BookMark from 'vue-material-design-icons/BookMark.vue';
import BookMarkOutline from 'vue-material-design-icons/BookMarkOutline.vue';
import { useStore } from 'vuex';
import postService from '../services/postService';

export default {
    name: 'SaveButton',
    props: {
        post: {
            type: Object,
        },
        type: {
            type: String,
            default: 'post',
        },
    },
    components: {
        BookMarkOutline,
        BookMark,
    },
    setup(props) {
        const store = useStore();

        const isSaved = computed(() => {
            let isTrue = store.state.post.savedPosts
                .map((item) => item._id)
                .includes(props.post._id);

            return isTrue;
        });

        // watch(() => isLiked);

        const handleSave = async () => {
            if (!isSaved.value) {
                await postService.savePost(store, props.post);
            } else {
                await postService.unsavePost(store, props.post);
            }
        };

        return { isSaved, handleSave };
    },
};
</script>
