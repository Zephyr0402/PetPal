import axios from 'axios';

axios.defaults.withCredentials = true;

export const login = async (username, password) => {
    // return await axios.post('http://localhost:9999/api/login',{
    //     username: username,
    //     password: password
    // }).then(res => res.data);
    fetch('http://localhost:9999/api/login', {
        method: 'POST',
        body: JSON.stringify({
            "username":username,
            "password":password
        }),
        mode: 'cors',
        //credentials: 'include',
        headers: new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/json",
        })
    }).then(res => res.json());
}

export const register = async (username, password) => {
    // return await axios.post('http://localhost:9999/api/register',{
    //     username: username,
    //     password: password
    // }).then(res => res.data);
    return fetch('http://localhost:9999/api/register', {
        method: 'POST',
        body: JSON.stringify({
            "username":username,
            "password":password
        }),
        //mode: 'cors',
        //credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json());
}

export const getHeader = async (name) => {
    return await axios.get('http://localhost:9999/api/userStatus/'+name)
        .then(res => res.data);
}

export const getCookie = async () => {
    return await axios.get('http://localhost:9999/api/cookie-session')
        .then(res => res);
}

export const getView = async () => {
    return await axios.get('http://localhost:9999/api/test')
        .then(res => res);
}

export const testPost = async() => {
    return await axios.post('http://localhost:9999/api/testPost').then(res => res.data)
}