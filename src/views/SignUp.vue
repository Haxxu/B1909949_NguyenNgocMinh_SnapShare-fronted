<template>
    <div class="sign-up">
        <form @submit.prevent="submitForm">
            <label>
                Name:
                <input type="text" v-model="form.name" @blur="v$.name.$touch" />
                <div v-if="v$.name.$error" class="error">
                    {{ v$.name.$errors[0].$message }}
                </div>
            </label>
            <label>
                Account:
                <input type="text" v-model="form.account" />
                <div v-if="v$.account.$error" class="error">
                    {{ v$.account.$errors[0].$message }}
                </div>
            </label>
            <label>
                Password:
                <input type="text" v-model="form.password" />
                <div v-if="v$.password.$error" class="error">
                    {{ v$.password.$errors[0].$message }}
                </div>
            </label>
            <label>
                Confirm Password:
                <input type="text" v-model="form.confirmPassword" />

                <div v-if="v$.confirmPassword.$error" class="error">
                    Comfirm password must be equal to password
                </div>
            </label>
            <label>
                Description:
                <textarea v-model="form.description"></textarea>
            </label>
            <button type="submit">Submit</button>
        </form>
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

        const submitForm = async () => {
            if (v$.value.$invalid) {
                v$.value.$touch();
                return;
            }

            await authService.signup(store, form);
            router.push({ name: 'Home' });
        };

        return {
            form,
            v$,
            submitForm,
        };
    },
};
</script>

<style lang="scss">
.sign-up {
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
        max-width: 500px;
        padding: 30px;
        background-color: #f5f5f5;
        border-radius: 5px;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);

        label {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-bottom: 20px;

            input,
            textarea {
                width: 100%;
                margin-top: 5px;
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

        .error {
            color: red;
        }
    }
}
</style>

<!-- <style lang="scss">
.sign-up {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 1rem;

    label {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 1.2rem;
        font-weight: bold;

        input,
        textarea {
            margin-top: 0.5rem;
            padding: 0.5rem;
            font-size: 1rem;
            border: none;
            border-radius: 0.5rem;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

            &:focus {
                outline: none;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
            }
        }

        .error {
            margin-top: 0.5rem;
            color: red;
            font-size: 0.8rem;
            font-weight: normal;
        }
    }

    button[type='submit'] {
        margin-top: 1rem;
        padding: 0.5rem;
        font-size: 1rem;
        border: none;
        border-radius: 0.5rem;
        background-color: #4caf50;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
            background-color: #388e3c;
        }
    }
}
</style> -->
