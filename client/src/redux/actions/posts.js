import { FETCH_LOADING, FETCH_LOADED, FETCH_POSTS, CREATE, HIDE, UPDATE, DELETE, LIKE, COMMENT, UPDATECOMMENT, DELETECOMMENT } from '../constants/actionTypes';
import * as api from '../../axios';

export const fetchLoading = () => ({type: FETCH_LOADING})
export const fetchLoaded = () => ({type: FETCH_LOADED})

// Action Creators
export const getPosts = () => async (dispatch) => {
    dispatch(fetchLoading());
    try {
        const { data } = await api.fetchPosts();
        
        dispatch({ type: FETCH_POSTS, payload: data });
        dispatch(fetchLoaded());
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: CREATE, payload: post });

        await api.createPost(post);

    } catch (error) {
        console.log(error);
    }
}

export const hidePost = (postId, post) => async (dispatch) => {
    try {
        await api.updatePost(postId, post);

        dispatch({ type: HIDE, payload: post });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (postId, post) => async (dispatch) => {
    console.log(post)
    try {
        await api.updatePost(postId, post);

        dispatch({ type: UPDATE, payload: post });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (postId) => async (dispatch) => {
    try {
        await api.deletePost(postId);

        dispatch({ type: DELETE, payload: postId });
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (postId) => async (dispatch) => {
    try {
        const { data } = await api.likePost(postId);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const commentPost = (postId, comment) => async (dispatch) => {
    try {
        const { data } = await api.commentPost(postId, comment);
        
        dispatch({ type: COMMENT, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteCommentPost = (postId, comment) => async (dispatch) => {
    try {
        const { data } = await api.deleteCommentPost(postId, comment);
        
        dispatch({ type: DELETECOMMENT, postId, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateCommentPost = (postId, updatedCommentPost) => async (dispatch) => {
    try {
        const { data } = await api.updateCommentPost(postId, updatedCommentPost);
        
        dispatch({ type: UPDATECOMMENT, postId, payload: data });
    } catch (error) {
        console.log(error);
    }
}