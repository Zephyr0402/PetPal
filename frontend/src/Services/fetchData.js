import backendURL from 'backendURL';

const fetchAnimalList = async () => {
    fetch(backendURL + '/animalInfo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        return response.json();
    })
}

const fetchAnimalListByKind = (kind) => {
    const data = { 'kind': kind };
    fetch(backendURL + '/animalInfo/kind', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    })
}

const fetchAnimalListByCost = (costMin, costMax) => {
    const data = { 'costMin': costMin, 'costMax': costMax };
    fetch(backendURL + '/animalInfo/cost', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    })
}