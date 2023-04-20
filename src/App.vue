<template>
    <div id="app">
        <component :is="layout">
            <router-view />
        </component>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import authService from './services/authService';
import DefaultLayoutVue from './layouts/DefaultLayout.vue';

export default {
    name: 'App',
    setup() {
        const router = useRouter();
        const store = useStore();

        const isLoggedIn = computed(() => store.state.auth.isLoggedIn);

        const logout = async () => {
            await authService.logout(store);
            router.push({ name: 'Login' });
        };

        const layout = computed(() => {
            return DefaultLayoutVue;
        });

        return {
            isLoggedIn,
            logout,
            layout,
        };
    },
};
</script>
