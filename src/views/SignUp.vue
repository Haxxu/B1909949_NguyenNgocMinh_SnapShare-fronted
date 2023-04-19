<template>
    <div>
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
                {{ v$.confirmPassword }}
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

<style>
.error {
    color: red;
}
</style>
