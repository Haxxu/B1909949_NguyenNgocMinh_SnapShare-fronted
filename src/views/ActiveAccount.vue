<template>
    <div>
        <div>Active Account</div>
        <!-- <div>{{ token }}</div> -->
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

import authService from '@/services/authService';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();

        const token = ref(route.query.token);

        onMounted(() => {
            const callApi = async () => {
                const isSuccess = await authService.activeAccount(token.value);
                if (isSuccess) {
                    toast.success('Active account successfully');
                    router.push({ name: 'Login' });
                } else {
                    toast.error('Active account failure!');
                    router.push({ name: 'SignUp' });
                }
            };

            callApi().catch(console.error);
        });

        return {
            token,
        };
    },
};
</script>
