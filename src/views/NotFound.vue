<template>
    <div class="notfound-container">
        <div class="left">
            <div class="info">
                <h1 class="title">404 Not Found</h1>
                <p class="text">
                    We couldn't find the page you were looking for. Maybe our
                    FAQ or Community can help?
                </p>
            </div>
            <div class="navigation">
                <q-btn
                    @click="goBack"
                    color="primary"
                    text-color="white"
                    size="20px"
                    padding="sm"
                >
                    Go Back
                </q-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
    name: 'NotFound',
    setup() {
        const router = useRouter();

        const goBack = () => {
            router.go(-1);
        };

        return {
            goBack,
        };
    },
};
</script>

<style lang="scss" scoped>
.notfound-container {
    width: 100%;
    background-color: var(--background-color);
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    padding: 0;
    overflow: hidden;
    padding-bottom: 40px;

    .left {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 2rem;
        flex: 1;

        .info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 100;

            .title {
                font-size: 30px;
                letter-spacing: -0.01em;
                font-weight: 900;
                margin: 0 0 4rem;
                padding-bottom: 1rem;
                text-align: center;
            }

            .text {
                font-size: 20px;
                font-weight: 400;
                margin: 0 0 1rem;
                padding: 0 2rem 2rem;
                line-height: 3rem;
                text-align: center;
            }
        }

        .navigation {
            margin-top: 20px;
        }
    }
}
</style>
