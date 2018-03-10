import { 
    AUTH_USER, 
    UNAUTH_USER, 
    AUTH_ERROR, 
    GET_ADMIN, 
    ITEM_ADDED, 
    GET_ITEMS 
} from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case AUTH_USER:
            return { ...state, authenticated: true };
        case UNAUTH_USER:
            return { ...state, authenticated: false };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        case ITEM_ADDED:
            return { ...state, message: action.payload };
        case GET_ITEMS:
            return { ...state, items: action.payload };
    }
    return state;
}