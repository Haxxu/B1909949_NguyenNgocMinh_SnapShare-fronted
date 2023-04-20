<template>
    <div class="text-field">
        <label :for="label">
            {{ label }}
            <input
                type="text"
                :id="label"
                :class="{ error: error }"
                v-model="value"
            />
        </label>
        <div v-if="$v.$error" class="error-message">
            {{ $v.$params.rule.message }}
        </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, maxLength } from '@vuelidate/validators';

export default {
    name: 'TextField',
    props: {
        label: {
            type: String,
            required: true,
        },
        error: {
            type: Boolean,
            default: false,
        },
        errorMessage: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '',
        },
        rules: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const v$ = useVuelidate(props.rules, props.value);

        return {
            v$,
        };
    },
};
</script>
