import backendURL from './backendURL';
import axios from 'axios';
import { CodeFilled } from '@ant-design/icons';

axios.defaults.withCredentials = true;

export const login = async (username, password) => {
   return await fetch('http://localhost:9999/api/login', {
        method: 'POST',
        body: JSON.stringify({
            "email":username,
            "password":password
        }),
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json());
}

export const logout = async () => {
    return await axios.get(backendURL + '/api/logout')
    .then(res => res.data);
}

export const register = async (name, email, password, code) => {
    return await fetch('http://localhost:9999/api/register', {
        method: 'POST',
        body: JSON.stringify({
            "name":name,
            "email":email,
            "password":password,
            "code" : code
        }),
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json());
}

export const verify = async (email) => {
    return fetch('http://localhost:9999/api/auth', {
        method: 'POST',
        body: JSON.stringify({
            "email":email
        }),
        headers: {
            "Content-Type": "application/json",
        }
    });
}

export const sendResetLink = async (email) => {
    return fetch('http://localhost:9999/api/reset_token',{
        method: 'POST',
        body: JSON.stringify({
            "email":email
        }),
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const resetPassword = async (token, password) => {
    return await fetch('http://localhost:9999/api/reset_pwd/'+token, {
        method: 'POST',
        body: JSON.stringify({
            "password" : password
        }),
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json());
}

export const getHeader = async ( uuid = "" ) => {
    return await axios.get('http://localhost:9999/api/cur_user/'+uuid)
        .then(res => res.data);
}

export const getUserInfo = async ( uuid = "" ) => {
    return await axios.get(backendURL + '/api/info/'+ uuid)
        .then(res => res.data);
}

export const updateUserInfo = async (userInfo) => {
    return await fetch(backendURL+'/api/cur_user/info/update', {
        method: 'POST',
        credentials:'include',
        body: JSON.stringify({
            "name": userInfo.inputName,
            "phone": userInfo.inputPNumber,
            "city": userInfo.inputCity,
            "intro": userInfo.inputIntro,
        }),
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const checkUUID = async (uuid) => {
    return await axios.get(backendURL + '/api/check/'+ uuid)
    .then(res => res.data);
}

export const changeEmail = async (newEmail, code) => {
    return await fetch('http://localhost:9999/api/email/update', {
        method: 'POST',
        credentials:'include',
        body: JSON.stringify({
            "email" : newEmail,
            "code" : code
        }),
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json());
}