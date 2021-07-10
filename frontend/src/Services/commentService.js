import backendURL from './backendURL';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getComments = async (commentType, src) => {
    return await axios.get(backendURL + "/api/comment/"+commentType+"/"+src)
        .then(res => res.data);
}