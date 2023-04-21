<template>
    <div class="main-layout-container">
        <div class="sidebar">
            <sidebar />
        </div>
        <div class="main">
            <main class="main-content">
                <slot></slot>
                <Footer v-if="showFooter"></Footer>
            </main>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import Footer from '@/components/Footer.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
    components: {
        Footer,
        Sidebar,
    },
    setup() {
        const router = useRouter();

        const showFooter = computed(() => {
            return router.currentRoute.value.meta.showFooter || false;
        });

        return { showFooter };
    },
};
</script>

<style lang="scss" scoped>
.main-layout-container {
    display: grid;
    position: relative;
    grid-template-columns: 1fr 4fr;
    width: 100%;
    height: 100vh;
    background-color: var(--background-color);

    .sidebar {
        width: 100%;
        border-right: 1px solid #555;
        height: 100vh;
    }

    .main {
        position: relative;
        width: 100%;

        .main-content {
            color: var(--text-primary);
            height: 100vh;
            width: 100%;
            overflow: scroll;
            overflow-x: hidden;

            &::-webkit-scrollbar-track {
                border: 1px solid var(--text-color);
                background-color: var(--background-color);
            }

            &::-webkit-scrollbar {
                width: 10px;
                background-color: var(--background-color);
            }

            &::-webkit-scrollbar-thumb {
                background-color: var(--text-secondary);
            }

            &::-webkit-scrollbar-thumb:hover {
                background-color: var(--text-primary);
            }
        }
    }
}
</style>
