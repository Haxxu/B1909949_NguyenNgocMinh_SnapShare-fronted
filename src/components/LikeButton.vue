<template>
    <button @click="handleLike" class="-mt-[14px]">
        <HeartOutline
            v-if="!isLiked"
            class="pl-2 cursor-pointer"
            :size="size"
        />
        <Heart
            v-else
            class="pl-2 cursor-pointer"
            fillColor="#FF0000"
            :size="size"
        />
    </button>
    <!-- <div class="justify-center d-flex align-items-center"></div> -->
</template>

<script>
import { computed, watch, watchEffect } from 'vue';
import Heart from 'vue-material-design-icons/Heart.vue';
import HeartOutline from 'vue-material-design-icons/HeartOutline.vue';
import { useStore } from 'vuex';
import postService from '../services/postService';
import commentService from '../services/commentService';

export default {
    name: 'LikeButton',
    props: {
        post: {
            type: Object,
        },
        comment: {
            type: Object,
        },
        type: {
            type: String,
            default: 'post',
        },
        size: {
            type: Number,
            default: 30,
        },
    },
    components: {
        Heart,
        HeartOutline,
    },
    setup(props) {
        const store = useStore();
        let isLiked;

        isLiked = computed(() => {
            var isTrue;
            if (props.type === 'comment') {
                isTrue = props.comment.likes.find(
                    (item) => item.user === store.state.auth.user._id
                );
            } else {
                isTrue = props.post.likes.find(
                    (item) => item.user === store.state.auth.user._id
                );
            }

            return isTrue;
        });

        const handleLike = async () => {
            if (props.type === 'comment') {
                if (!isLiked.value) {
                    await commentService.likeComment(store, props.comment);
                } else {
                    await commentService.unlikeComment(store, props.comment);
                }
            } else if (props.type === 'post') {
                if (!isLiked.value) {
                    await postService.likePost(store, props.post);
                } else {
                    await postService.unlikePost(store, props.post);
                }
            }
        };

        return { isLiked, handleLike };
    },
};
</script>
