import axios from 'axios';

const API = axios.create({
    baseURL: 'https://my-recipy.herokuapp.com/'
})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const hidePost = (id, updatedPost) => API.patch(`/posts/${id}/hidePost`, updatedPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentPost = (id, comment) => API.patch(`/posts/${id}/commentPost`, comment);
export const deleteCommentPost = (id, comment) => API.patch(`/posts/${id}/deleteCommentPost`, comment);
export const updateCommentPost = (id, updatedCommentPost) => API.patch(`/posts/${id}/updateCommentPost`, updatedCommentPost);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signUp', formData);