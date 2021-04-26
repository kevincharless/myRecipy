import { AUTH, ERROR, FETCH_LOADING, FETCH_LOADED } from "../constants/actionTypes";
import * as api from '../../axios';

export const fetchLoading = () => ({type: FETCH_LOADING})
export const fetchLoaded = () => ({type: FETCH_LOADED})

export const signIn = (formData, history) => async dispatch => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        history.push('/home');
    } catch (error) {
        const message = error.response.data.message 

        dispatch({ type: ERROR, message });
    }
}

export const signUp = (formData, history) => async dispatch => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        history.push('/home');
    } catch (error) {
        const message = error.response.data.message 

        dispatch({ type: ERROR, message });
    }
}