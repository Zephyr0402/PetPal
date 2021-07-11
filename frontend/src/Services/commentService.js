import backendURL from './backendURL';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getComments = async (commentType, src) => {
    return await axios.get(backendURL + "/api/comment/"+commentType+"/"+src)
        .then(res => res.data);
}

export const postComment = async (id, type, commentText) => {
    console.log(id, type, commentText)
    return await fetch(backendURL + "/api/comment/", {
        method: 'POST',
        body : JSON.stringify({
            "fcid" : type === "comment" ? id : undefined,
            "uaid" : type === "animal" ? id : undefined,
            "uuid" : type === "user" ? id : undefined,
            "content" : commentText,
            "time" : new Date()
        }),
        headers : {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    }).then(res => res.json());
}

export const LikeComment = async (ucid, type) => {
    return await fetch(backendURL + "/api/comment/like/"+type+"/"+ucid, {
        method: 'POST',
       credentials: 'include'
    }).then(res => res.json());
}

export const DislikeComment = async (ucid, type) => {
    return await fetch(backendURL + "/api/comment/dislike/"+type+"/"+ucid, {
        method: 'POST',
        credentials: 'include'
    }).then(res => res.json());
}