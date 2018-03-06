import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:8000';

export function signinAdmin({ username, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signin`, {username, password})
            .then(response => {
                dispatch({ type: AUTH_USER });
                console.log('pewp');
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

export function signoutAdmin() {
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER
    };
}

export function fetchMessage() {
    return function (dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token')}
        })
        .then(response => {
            dispatch({
                type: FETCH_MESSAGE,
                payload: response.data.message
            });
        });
    };
}