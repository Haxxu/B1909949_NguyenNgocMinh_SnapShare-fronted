<template>
    <div id="app">
        <nav>
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/login">Login</router-link></li>
                <li><router-link to="/signup">Signup</router-link></li>
                <li v-if="isLoggedIn">
                    <button @click="logout">Logout</button>
                </li>
            </ul>
        </nav>
        <router-view />
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import authService from './services/authService';

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

        return {
            isLoggedIn,
            logout,
        };
    },
};
</script>
