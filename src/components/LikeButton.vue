<template>
    <button @click="handleLike" class="-mt-[14px]">
        <HeartOutline v-if="!isLiked" class="pl-2 cursor-pointer" :size="30" />
        <Heart
            v-else
            class="pl-2 cursor-pointer"
            fillColor="#FF0000"
            :size="30"
        />
    </button>
    <!-- <div class="d-flex justify-center align-items-center"></div> -->
</template>

<script>
import { computed, watch } from 'vue';
import Heart from 'vue-material-design-icons/Heart.vue';
import HeartOutline from 'vue-material-design-icons/HeartOutline.vue';
import { useStore } from 'vuex';
import postService from '../services/postService';

export default {
    name: 'LikeButton',
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
        Heart,
        HeartOutline,
    },
    setup(props) {
        const store = useStore();

        const isLiked = computed(() => {
            let isTrue = props.post.likes
                .map((item) => item.user)
                .includes(store.state.auth.user._id);

            return isTrue;
        });

        // watch(() => isLiked);

        const handleLike = async () => {
            if (props.type === 'comment') {
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
