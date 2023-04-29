import axios from 'axios';
import {
    loginUrl,
    signupUrl,
    activeAccountUrl,
    getUserInfoUrl,
} from '@/api/urls';
import { toast } from 'vue3-toastify';
import axiosInstance from '../api/axiosInstance';

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

                await this.fetchUserWithToken(store, res.data.token);

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
            // console.log({
            //     name,
            //     account,
            //     password,
            //     description,
            // });
            const res = await axios.post(signupUrl(), {
                account,
                password,
                name,
                description,
            });
            if (res.status === 200) {
                store.dispatch('signup', res.data.token);
                toast.success(res.data.message);

                await this.fetchUserWithToken(store, res.data.token);

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

    async activeAccount(token) {
        try {
            const res = await axios.post(activeAccountUrl(), {
                active_token: token,
            });
            if (res.status === 200) {
                // toast.success(res.data.message);
                return true;
            }

            return false;
        } catch (error) {
            if (error.response && error.response.status >= 400) {
                // toast.error(error.response.data.message);
            } else {
                console.log(error);
            }
            return false;
        }
    }

    async fetchUser(store) {
        try {
            const res = await axiosInstance.get(getUserInfoUrl());
            store.commit('setUser', res.data.data);
            if (res.status == 200) {
            }
        } catch (error) {
            if (error.response && error.response.status >= 400) {
                // toast.error(error.response.data.message);
            } else {
                console.log(error);
            }
            return false;
        }
    }

    async fetchUserWithToken(store, token) {
        try {
            const res = await axios.get(getUserInfoUrl(), {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            });

            // console.log(res);
            store.commit('setUser', res.data.data);
            if (res.status == 200) {
            }
        } catch (error) {
            if (error.response && error.response.status >= 400) {
                // toast.error(error.response.data.message);
            } else {
                console.log(error);
            }
            return false;
        }
    }
}

export default new AuthService();
