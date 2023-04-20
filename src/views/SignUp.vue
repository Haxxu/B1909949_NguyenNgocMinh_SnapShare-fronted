<template>
    <div class="signup-container">
        <h1 class="header">Sign Up</h1>
        <q-form @submit.prevent="submitForm" class="form-container">
            <div class="input-container">
                <q-input
                    type="text"
                    v-model="form.name"
                    filled
                    label="Name"
                    clearable
                    lazy-rules
                    :rules="[
                        () => {
                            if (!v$.name.$error) {
                                return true;
                            } else {
                                return v$.name.$errors[0].$message;
                            }
                        },
                    ]"
                />
            </div>
            <div class="input-container">
                <q-input
                    type="text"
                    v-model="form.account"
                    filled
                    label="Account"
                    clearable
                    :rules="[
                        (_) => {
                            if (!v$.account.$error) return true;
                            else return v$.account.$errors[0].$message;
                        },
                    ]"
                />
            </div>
            <div class="input-container">
                <q-input
                    type="password"
                    v-model="form.password"
                    filled
                    label="Password"
                    clearable
                    lazy-rules
                    :rules="[
                        (_) => {
                            if (!v$.password.$error) return true;
                            else return v$.password.$errors[0].$message;
                        },
                    ]"
                />
            </div>
            <div class="input-container">
                <q-input
                    type="password"
                    v-model="form.confirmPassword"
                    filled
                    label="Confirm password"
                    clearable
                    :rules="[
                        (_) => {
                            if (!v$.confirmPassword.$error) return true;
                            else return v$.confirmPassword.$errors[0].$message;
                        },
                    ]"
                />
            </div>
            <div class="input-container">
                <q-input
                    type="textarea"
                    v-model="form.description"
                    filled
                    label="Description"
                    clearable
                />
            </div>
            <q-btn
                type="submit"
                color="primary"
                text-color="text-secondary"
                label="   Sign Up   "
                :loading="isSubmiting"
                size="20px"
                padding="sm"
            >
                <template v-slot:loading>
                    <q-spinner-facebook />
                </template>
            </q-btn>
        </q-form>
        <div class="login-section">
            <h4 class="title">Have an account?</h4>
            <q-btn
                outline
                color="secondary"
                text-color="text-secondary"
                label="Log in"
                padding="sm"
                @click="navigateToLogin"
            />
        </div>
    </div>
</template>

<script>
import { reactive, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, sameAs } from '@vuelidate/validators';
import { useStore } from 'vuex';

import authService from '@/services/authService';
import { useRouter } from 'vue-router';

export default {
    name: 'SignUp',
    setup() {
        const store = useStore();
        const router = useRouter();

        const form = reactive({
            name: '',
            account: '',
            password: '',
            confirmPassword: '',
            description: '',
        });
        const isSubmiting = ref(false);

        const passwordValue = ref('');

        watch(
            () => form.password,
            (value) => {
                passwordValue.value = value;
            }
        );

        const rules = {
            name: { required },
            account: { required, minLength: minLength(2) },
            password: { required, minLength: minLength(8) },
            confirmPassword: {
                required,
                minLength: minLength(8),
                sameAs: sameAs(passwordValue),
            },
        };

        const v$ = useVuelidate(rules, form);
        v$.value.$touch();

        const submitForm = async () => {
            if (v$.value.$invalid) {
                v$.value.$touch();
                return;
            }

            isSubmiting.value = true;
            await authService.signup(store, form);
            isSubmiting.value = false;
            router.push({ name: 'Home' });
        };

        const navigateToLogin = () => {
            router.push({ name: 'Login' });
        };

        return {
            form,
            v$,
            isSubmiting,
            navigateToLogin,
            submitForm,
        };
    },
};
</script>

<style lang="scss" scoped>
.signup-container {
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

    .login-section {
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
