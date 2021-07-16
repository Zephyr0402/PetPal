import backendURL from './backendURL';

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