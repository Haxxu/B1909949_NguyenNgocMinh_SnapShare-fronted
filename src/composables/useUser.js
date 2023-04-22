import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { getUserInfoUrl } from '../api/urls';

export default function useUser() {
    const store = useStore();
    const user = ref(null);
    const loading = ref(false);
    const error = ref(null);

    async function fetchUser() {
        loading.value = true;
        error.value = null;

        const token = store.state.auth.token;
        if (!token) {
            loading.value = false;
            error.value = 'No authentication token found';
            return;
        }

        try {
            const res = await axios.get(getUserInfoUrl(), {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            });
            user.value = res.data.data;
            store.commit('setUser', user.value);
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    return {
        user,
        loading,
        error,
        fetchUser,
    };
}
