<template>
    <div class="container">
        <h1 class="header">Login</h1>
        <q-form @submit.prevent="login" class="form-container">
            <div class="input-container">
                <q-input
                    type="text"
                    v-model="account"
                    filled
                    label="Account"
                    clearable
                    lazy-rules
                    :rules="[
                        (val) =>
                            (val && val.length > 0) || 'Please filled input',
                    ]"
                />
            </div>
            <div class="input-container">
                <q-input
                    type="password"
                    v-model="password"
                    filled
                    label="Password"
                    clearable
                    lazy-rules
                    :rules="[
                        (val) =>
                            (val && val.length > 0) || 'Please filled input',
                    ]"
                />
            </div>
            <q-btn
                type="submit"
                color="primary"
                text-color="text-secondary"
                label="   Login   "
                :loading="isSubmiting"
                size="20px"
                padding="sm"
            >
                <template v-slot:loading>
                    <q-spinner-facebook />
                </template>
            </q-btn>
        </q-form>
        <div class="signup-section">
            <h4 class="title">Does't have an account?</h4>
            <q-btn
                outline
                color="secondary"
                text-color="text-secondary"
                label="Sign up"
                padding="sm"
                @click="navigateToSignUp"
            />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useStore } from 'vuex';

import authService from '@/services/authService';

export default {
    name: 'Login',
    setup() {
        const account = ref('');
        const password = ref('');
        const isSubmiting = ref(false);

        const router = useRouter();
        const store = useStore();

        const login = async () => {
            isSubmiting.value = true;
            const isSuccess = await authService.login(
                store,
                account.value,
                password.value
            );
            isSubmiting.value = false;
            if (isSuccess) {
                router.push({ name: 'Home' });
            }
        };

        const navigateToSignUp = () => {
            router.push({ name: 'SignUp' });
        };

        return {
            account,
            password,
            isSubmiting,
            login,
            navigateToSignUp,
        };
    },
};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* height: 450px; */
    width: 450px;
    padding: 20px;
    margin: 20px;
    border-radius: 2px;
    border: 1px solid var(--secondary-color);
    /* box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px; */

    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);

    .header {
        margin: 10px 0;
        font-size: 40px;
        font-family: 'Open Sans', sna;
        font-weight: bold;
    }

    .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        .input-container {
            width: 100%;
            margin: 15px 20px 20px;
        }

        .action-btn {
            min-width: 200px;
            /* padding: 20px; */
        }
    }

    .signup-section {
        width: 100%;
        text-align: center;
        margin-top: 40px;
        border-top: solid 1px #000;

        .title {
            font-size: 16px;
        }
    }
}
</style>
