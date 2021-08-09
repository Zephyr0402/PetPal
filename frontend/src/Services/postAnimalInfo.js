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


export const removeAnimal = (animalId) => {

    return fetch(backendURL + "/animalInfo/delete/"+animalId, {
        method: "DELETE",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
    }).then(res => {
        res.text().then(txt => console.log(txt));
        if(res.status === 200) {
            return true;
        }else if(res.status >= 400){
            return false;
        }
    });

};
