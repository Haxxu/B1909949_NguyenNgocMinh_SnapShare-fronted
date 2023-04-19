import axios from 'axios';
import { loginUrl, signupUrl } from '@/api/urls';
import { toast } from 'vue3-toastify';

class AuthService {
    async login(store, account, password) {
        try {
            const res = await axios.post(loginUrl(), {
                account,
                password,
            });
            if (res.status === 200) {
                store.dispatch('login', res.data.token);
                toast.success(res.data.message);
                return true;
            }
            toast.error(res.data.message);
            return false;
        } catch (error) {
            if (error.response && error.response.status >= 400) {
                toast.error(error.response.data.message);
            } else {
                console.log(error);
            }
            return false;
        }
    }

    async signup(store, { name, account, password, description }) {
        try {
            console.log({
                name,
                account,
                password,
                description,
            });
            const res = await axios.post(signupUrl(), {
                account,
                password,
                name,
                description,
            });
            if (res.status === 200) {
                store.dispatch('signup', res.data.token);
                toast.success(res.data.message);
                return true;
            }
            toast.error(res.data.message);
            return false;
        } catch (error) {
            if (error.response && error.response.status >= 400) {
                toast.error(error.response.data.message);
            } else {
                console.log(error);
            }
            return false;
        }
    }

    async logout(store) {
        store.dispatch('logout');
        toast.success('Logout success.');
    }
}

export default new AuthService();
