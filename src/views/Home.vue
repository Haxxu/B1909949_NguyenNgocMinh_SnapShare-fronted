<template>
    <div class="mx-auto lg:pl-0 md:pl-[80px] pl-0">
        <post v-for="(post, index) in posts" :key="index" :post="post"></post>
    </div>
</template>

<script>
import Post from '@/components/Post.vue';
import { useStore } from 'vuex';
import { computed, onBeforeMount, onMounted, onUnmounted } from 'vue';
import postService from '../services/postService';
import authService from '../services/authService';

export default {
    name: 'Home',
    components: {
        Post,
    },
    setup() {
        const store = useStore();

        const posts = computed(() => store.state.post.homePosts);

        onMounted(async () => {
            await postService.fetchHomePosts(store);
            await postService.fetchSavedPosts(store);
            // await authService.fetchUser(store);
        });

        onUnmounted(() => {
            store.dispatch('setPosts', []);
        });

        return {
            posts,
        };
    },
};
</script>
