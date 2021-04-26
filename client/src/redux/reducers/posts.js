import { FETCH_LOADING, FETCH_LOADED, FETCH_POSTS, CREATE, HIDE, UPDATE, DELETE, LIKE, COMMENT, DELETECOMMENT, UPDATECOMMENT } from '../constants/actionTypes';

const initialState = {
    posts: [],
    isLoading: true
}

const posts = (state = initialState, action) => {
    switch (action.type) {
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
        case FETCH_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case CREATE:
            return {
                posts: [action.payload, ...state.posts]
            }
        case COMMENT:
        case DELETECOMMENT:
        case UPDATECOMMENT:
        case LIKE:
        case HIDE:
        case UPDATE:
            return {
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
            }
        case DELETE:
            return {
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        default:
            return state;
    }
}

export default posts;