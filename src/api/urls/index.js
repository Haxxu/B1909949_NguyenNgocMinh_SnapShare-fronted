const apiUrl = import.meta.env.VITE_API_URL;

export const loginUrl = () => `${apiUrl}/auth/login`;

export const signupUrl = () => `${apiUrl}/auth/register`;
