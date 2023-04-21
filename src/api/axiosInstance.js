import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    async (req) => {
        const token = window.localStorage.getItem('snapshare-x-auth-token');

        if (token) {
            req.headers['x-auth-token'] = token;
        }

        return Promise.resolve(req);
    },
    (error) => {
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500
        ) {
            console.error(error.response.data.message);
        } else {
            console.error(error);
            console.log('Something went wrong!');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
