import backendURL from './backendURL';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getChannels = async () => {
    return axios.get(backendURL + "/api/channel")
        .then(res => res.data);
}

export const getWhispers = async (cid) => {
    return axios.get(backendURL + "/api/channel/"+cid)
        .then(res => res.data);
}

export const postChannel = async (name, mbs) => {
    return fetch(backendURL + "/api/channel/", {
        method: 'POST',
        body : JSON.stringify({
            'name' : name,
            'members' : mbs
        }),
        headers : {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    }).then(res => res.json());
}

export const getUnreadWhisper = async () => {
    return axios.get(backendURL + "/api/whisper/unread")
    .then(res => res.data);
}