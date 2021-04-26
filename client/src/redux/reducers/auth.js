import { AUTH, LOGOUT, ERROR, FETCH_LOADING, FETCH_LOADED } from '../constants/actionTypes';

const initialState = {
    authData: JSON.parse(localStorage.getItem('profile')),
    otherProfile: [],
    users: [],
    errorMessage: '',
    isLoading: true
}

export default function authReducer(state = initialState, action) {
    switch(action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action.data }));

            return {...state, authData: action?.data, errorMessage: '' };
        case FETCH_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_LOADED: 
            return {
                ...state,
                isLoading: false
            }
        case ERROR:
            return {...state, errorMessage: action.message };
        case LOGOUT:
            localStorage.clear();

            return {...state, authData: null }
        default:
            return state;
    }
}