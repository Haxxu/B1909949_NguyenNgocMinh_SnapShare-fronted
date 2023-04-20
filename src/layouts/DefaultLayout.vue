<template>
    <div class="default-layout-container">
        <header class="header">
            <h1>SnapShare</h1>
        </header>
        <main class="main">
            <slot></slot>
        </main>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '@/components/Footer.vue';

export default {
    components: {
        Footer,
    },
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.default-layout-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    /* min-height: 100vh; */
    background-color: var(--background-color);
    color: var(--text-primary);

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        width: 100%;
        height: 100px;
        padding: 20px 150px;
        border-bottom: solid 1px #000;
        margin-bottom: 20px;

        .brand {
            color: var(--text-primary);
            font-size: 5rem;
            font-weight: 700;
            text-decoration: none;
            font-family: 'Belleza', 'Roboto', sans-serif;
        }
    }

    .main {
        display: flex;
        justify-content: center;
    }
}
</style>
