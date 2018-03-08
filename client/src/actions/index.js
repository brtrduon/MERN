import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types';

const ROOT_URL = 'http://localhost:8000';

export function signinAdmin({ username, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signin`, {username, password})
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/root');
            })
            .catch(() => {
                dispatch(authError('Bad login info'));
            });
    }
}

export function signupAdmin({ username, first_name, last_name, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { username, first_name, last_name, password})
        .then(response => {
            dispatch({ type: AUTH_USER });
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/root');
        })
        .catch(response => dispatch(authError(response.response.data.err)));
    };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function addItem({ name, price, desc }) {
    return function(dispatch) {
        
    }
}

export function signoutAdmin() {
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER
    };
}