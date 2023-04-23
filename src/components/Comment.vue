<template>
    <div class="flex items-start justify-between flex-nowrap">
        <div class="flex flex-nowrap">
            <img
                class="rounded-full w-[38px] h-[38px] cursor-pointer"
                :src="comment.owner.image"
                @click="navigateToUserPage"
            />
            <div class="ml-4">
                <span
                    class="text-[15px] font-extrabold mr-2 cursor-pointer"
                    @click="navigateToUserPage"
                >
                    {{ comment.owner.account }}
                </span>
                <span class="text-[13px]">
                    {{ comment.content }}
                </span>
                <div class="flex items-center mt-2">
                    <span class="text-xs font-light text-gray-700">{{
                        getTimeGap(comment.createdAt)
                    }}</span>
                    <span
                        v-if="comment.likes.length > 0"
                        class="ml-3 text-sm font-normal text-gray-600"
                    >
                        {{ comment.likes.length }} likes
                    </span>
                    <DotsHorizontal
                        v-if="user._id === comment.owner._id"
                        class="ml-3 cursor-pointer"
                        @click="openCommentOptionsOverlay"
                        :size="18"
                    />
                </div>
            </div>
        </div>
        <div class="flex items-start">
            <like-button
                type="comment"
                :comment="comment"
                :size="20"
            ></like-button>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';

import { getTimeGap } from '../utils/time';
import LikeButton from './LikeButton.vue';
import { useRouter } from 'vue-router';

export default {
    name: 'Comment',
    props: {
        comment: { type: Object },
    },
    components: {
        DotsHorizontal,
        LikeButton,
    },
    setup(props) {
        const store = useStore();
        const router = useRouter();

        const user = computed(() => store.state.auth.user);

        const navigateToUserPage = () => {
            store.dispatch('setShowCurrentPostOverlay', false);
            router.push({
                name: 'User',
                params: {
                    id: props.comment.owner._id,
                },
            });
        };

        const openCommentOptionsOverlay = () => {
            store.dispatch('setCurrentComment', props.comment);
            store.dispatch('setShowCurrentCommentOptionsOverlay', true);
        };

        return {
            user,
            getTimeGap,
            navigateToUserPage,
            openCommentOptionsOverlay,
        };
    },
};
</script>
