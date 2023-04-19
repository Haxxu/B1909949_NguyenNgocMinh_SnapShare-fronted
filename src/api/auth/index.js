import axios from 'axios';
import { loginUrl } from '@/api/urls';

export const login = async (account, password) => {
    try {
        const res = await axios.post(loginUrl(), {
            account,
            password,
        });
        if (res.status === 200) {
            localStorage.setItem('snapshare-x-auth-token', res.data.token);

            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};
