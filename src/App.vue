<template>
    <div>
        <component :is="layout">
            <router-view />
        </component>
    </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import DefaultLayoutVue from './layouts/DefaultLayout.vue';
import authService from './services/authService';
import postService from './services/postService';

export default {
    name: 'App',
    setup() {
        const router = useRouter();
        const store = useStore();

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
        };
    },
};
</script>
