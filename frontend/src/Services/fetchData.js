import backendURL from './backendURL';

export const fetchAnimalList = async () => {
    const res = await fetch(backendURL + '/animalInfo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return res.json();
}
