const apiUrl = import.meta.env.VITE_API_URL;

export const loginUrl = () => `${apiUrl}/auth/login`;

export const signupUrl = () => `${apiUrl}/auth/register`;

export const activeAccountUrl = () => `${apiUrl}/auth/active`;

export const createPostUrl = () => `${apiUrl}/posts`;
