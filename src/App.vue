<template>
    <div>
        <component :is="layout">
            <router-view />
        </component>

        <show-post-overlay
            v-if="isShowCurrentPostOverlay"
            :post="currentPost"
        ></show-post-overlay>

        <show-post-options-overlay
            v-if="isShowCurrentPostOptionsOverlay"
            :post="currentPost"
        >
        </show-post-options-overlay>

        <show-edit-post-overlay
            v-if="isShowEditCurrentPostOverlay"
            :post="currentPost"
        ></show-edit-post-overlay>

        <show-comment-options-overlay
            v-if="isShowCurrentCommentOptionsOverlay"
            :comment="currentComment"
        >
        </show-comment-options-overlay>

        <show-user-list-overlay
            v-if="isShowUserListOverlay"
            :type="showUserListType"
        >
        </show-user-list-overlay>

        <show-edit-profile-overlay
            v-if="isShowEditProfileOverlay"
            :user="currentUser"
        >
        </show-edit-profile-overlay>
    </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import postService from './services/postService';
import authService from './services/authService';
import DefaultLayoutVue from './layouts/DefaultLayout.vue';
import ShowPostOverlay from './components/ShowPostOverlay.vue';
import ShowPostOptionsOverlay from './components/ShowPostOptionsOverlay.vue';
import ShowEditPostOverlay from './components/ShowEditPostOverlay.vue';
import ShowCommentOptionsOverlay from './components/ShowCommentOptionsOverlay.vue';
import ShowUserListOverlay from './components/ShowUserListOverlay.vue';
import ShowEditProfileOverlay from './components/ShowEditProfileOverlay.vue';

export default {
    name: 'App',
    components: {
        ShowPostOverlay,
        ShowPostOptionsOverlay,
        ShowEditPostOverlay,
        ShowCommentOptionsOverlay,
        ShowUserListOverlay,
        ShowEditProfileOverlay,
    },
    setup() {
        const router = useRouter();
        const store = useStore();

        const currentPost = computed(() => store.state.post.currentPost);
        const currentComment = computed(
            () => store.state.comment.currentComment
        );
        const currentUser = computed(() => store.state.user.currentUser);
        const isShowCurrentPostOverlay = computed(
            () => store.state.post.isShowCurrentPostOverlay
        );
        const isShowCurrentPostOptionsOverlay = computed(
            () => store.state.post.isShowCurrentPostOptionsOverlay
        );
        const isShowEditCurrentPostOverlay = computed(
            () => store.state.post.isShowEditCurrentPostOverlay
        );
        const isShowCurrentCommentOptionsOverlay = computed(
            () => store.state.comment.isShowCurrentCommentOptionsOverlay
        );
        const isShowUserListOverlay = computed(
            () => store.state.user.isShowUserListOverlay
        );
        const showUserListType = computed(
            () => store.state.user.showUserListType
        );
        const isShowEditProfileOverlay = computed(
            () => store.state.user.isShowEditProfileOverlay
        );

        const isLoggedIn = computed(() => store.state.auth.isLoggedIn);

        const layout = computed(() => {
            return router.currentRoute.value.meta.layout || DefaultLayoutVue;
        });

        onBeforeMount(async () => {
            await authService.fetchUser(store);
        });

        return {
            isLoggedIn,
            layout,
            currentPost,
            currentComment,
            currentUser,
            isShowCurrentPostOverlay,
            isShowCurrentPostOptionsOverlay,
            isShowEditCurrentPostOverlay,
            isShowCurrentCommentOptionsOverlay,
            isShowUserListOverlay,
            showUserListType,
            isShowEditProfileOverlay,
        };
    },
};
</script>
