import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/Home.vue';
import LoginView from '@/views/Login.vue';
import SignUpView from '@/views/SignUp.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginView,
            meta: {
                requiresQuest: true,
                layout: DefaultLayout,
            },
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUpView,
            meta: {
                requiresQuest: true,
                layout: DefaultLayout,
            },
        },
    ],
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('snapshare-x-auth-token');

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!token) {
            next({ name: 'Login' });
        } else {
            next();
        }
    } else if (to.matched.some((record) => record.meta.requiresQuest)) {
        if (token) {
            next({ name: 'Home' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
