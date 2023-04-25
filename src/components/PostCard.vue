<template>
    <div
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
        class="flex items-center justify-center cursor-pointer relative"
        @click="openPostOverlay"
    >
        <div
            v-if="isHover"
            class="absolute w-full h-full z-30 flex items-center justify-around text-lg font-extrabold text-white"
            :class="isHover ? 'bg-gray-900 bg-opacity-40' : ''"
        >
            <div class="flex items-center justify-around w-[50%]">
                <div class="flex items-center justify-center">
                    <Heart fillColor="#FFFFFF" :size="30" />
                    <div class="pl-1">{{ post.likes.length }}</div>
                </div>
                <div class="flex items-center justify-center">
                    <Comment fillColor="#FFFFFF" :size="30" />
                    <div class="pl-1">{{ comments.length }}</div>
                </div>
            </div>
        </div>

        <img
            class="aspect-square mx-auto z-0 object-cover cursor-pointer"
            :src="post.image"
        />
    </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
import Heart from 'vue-material-design-icons/Heart.vue';
import Comment from 'vue-material-design-icons/Comment.vue';
import { useStore } from 'vuex';

import commentService from '../services/commentService';

export default {
    name: 'PostCard',
    props: {
        post: {
            type: Object,
        },
    },
    components: {
        Heart,
        Comment,
    },
    setup(props) {
        const store = useStore();

        let isHover = ref(false);
        const comments = computed(() => {
            const c = store.state.post.posts.find(
                (item) => item._id === props.post._id
            );
            return c?.comments || [];
        });
        watchEffect(() => comments);

        onMounted(async () => {
            let data = await commentService.getCommentByPostId(props.post?._id);

            store.dispatch('addCommentsToPost', {
                postId: props.post._id,
                comments: data,
            });
        });

        const openPostOverlay = () => {
            isHover.value = false;
            store.dispatch('setCurrentPost', props.post);
            store.dispatch('setShowCurrentPostOverlay', true);
        };

        return {
            isHover,
            comments,
            openPostOverlay,
        };
    },
};
</script>
