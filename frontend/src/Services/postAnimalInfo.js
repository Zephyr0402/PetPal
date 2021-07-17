import backendURL from './backendURL';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const postAnimalInfo = async (req) => {
    const info = await fetch(backendURL + '/animalInfo/post', {
        method: 'POST',
        body: JSON.stringify(req),
        headers: new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/json",
        })
    });
    console.log(info);
}

export const getPostedAnimals = async () => {
    return await axios.get(backendURL+'/animalInfo/uuid')
        .then(res => res.data);
}