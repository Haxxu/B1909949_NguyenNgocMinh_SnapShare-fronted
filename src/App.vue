<template>
    <div>
        <component :is="layout">
            <router-view />
        </component>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import DefaultLayoutVue from './layouts/DefaultLayout.vue';

export default {
    name: 'App',
    setup() {
        const router = useRouter();
        const store = useStore();

        const isLoggedIn = computed(() => store.state.auth.isLoggedIn);

        const layout = computed(() => {
            return router.currentRoute.value.meta.layout || DefaultLayoutVue;
        });

        return {
            isLoggedIn,
            layout,
        };
    },
};
</script>
