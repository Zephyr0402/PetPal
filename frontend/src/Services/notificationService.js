import backendURL from './backendURL';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const notifyLike = async(duid, ucid) => {
    return await fetch(backendURL+'/api/notify/like', {
        method: 'POST',
        credentials:'include',
        body: JSON.stringify({
            "duid": duid,
            "ucid": ucid,
        }),
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json());
}