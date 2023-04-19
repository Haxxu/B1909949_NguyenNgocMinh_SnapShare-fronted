import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/Home.vue';
import LoginView from '@/views/Login.vue';
import SignUpView from '@/views/SignUp.vue';

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
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUpView,
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
    } else {
        next();
    }
});

export default router;
