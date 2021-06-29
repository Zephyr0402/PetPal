import backendURL from './backendURL';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const login = async (username, password) => {
    fetch(backendURL + '/api/login', {
        method: 'POST',
        body: JSON.stringify({
            "username":username,
            "password":password
        }),
        headers: new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/json",
        })
    }).then(res => res.json());
}

export const logout = async (username, password) => {
    return await axios.get(backendURL + '/api/logout')
    .then(res => res.data);
}

export const register = async (username, password) => {
    return fetch(backendURL + '/api/register', {
        method: 'POST',
        body: JSON.stringify({
            "username":username,
            "password":password
        }),
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json());
}

export const getHeader = async (name) => {
    return await axios.get(backendURL + '/api/userStatus/'+name)
        .then(res => res.data);
}

export const getCookie = async () => {
    return await axios.get(backendURL + '/api/cookie-session')
        .then(res => res);
}

export const getView = async () => {
    return await axios.get(backendURL + '/api/test')
        .then(res => res);
}

export const testPost = async() => {
    return await axios.post(backendURL + '/api/testPost').then(res => res.data)
}