<template>
    <div class="login">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <input type="text" v-model="account" placeholder="Account" />
            <input type="password" v-model="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
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
        const router = useRouter();
        const store = useStore();

        const login = async () => {
            const isSuccess = await authService.login(
                store,
                account.value,
                password.value
            );
            if (isSuccess) {
                router.push({ name: 'Home' });
            }
        };

        return {
            account,
            password,
            login,
        };
    },
};
</script>

<style lang="scss">
.login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    h1 {
        margin-bottom: 30px;
        font-size: 32px;
        font-weight: bold;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
        background-color: #f5f5f5;
        border-radius: 5px;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);

        input {
            width: 100%;
            margin-bottom: 20px;
            padding: 10px;
            border: none;
            border-radius: 5px;
            font-size: 16px;

            &:focus {
                outline: none;
                box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
            }
        }

        button {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;

            &:hover {
                background-color: #0069d9;
            }
        }
    }
}
</style>
