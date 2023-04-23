const apiUrl = import.meta.env.VITE_API_URL;

export const loginUrl = () => `${apiUrl}/auth/login`;

export const signupUrl = () => `${apiUrl}/auth/register`;

export const activeAccountUrl = () => `${apiUrl}/auth/active`;

export const getUserInfoUrl = () => `${apiUrl}/me/info`;

// POST
export const createPostUrl = () => `${apiUrl}/posts`;

export const updatePostByIdUrl = (postId) => `${apiUrl}/posts/${postId}`;

export const getPostsByTagsUrl = () => `${apiUrl}/posts`;

export const deletePostByIdUrl = (postId) => `${apiUrl}/posts/${postId}`;

export const getSavedPostsUrl = () => `${apiUrl}/me/saved-posts`;

export const handleLikePostUrl = () => `${apiUrl}/me/liked-posts`;

export const handleSavePostUrl = () => `${apiUrl}/me/saved-posts`;

// COMMENT
export const getCommentsByPostIdUrl = (postId) =>
    `${apiUrl}/posts/${postId}/comments`;

export const handleLikeCommentUrl = () => `${apiUrl}/me/liked-comments`;

export const createCommentUrl = () => `${apiUrl}/comments`;

export const deleteCommentByIdUrl = (commentId) =>
    `${apiUrl}/comments/${commentId}`;
