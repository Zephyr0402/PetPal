import backendURL from "./backendURL";
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getTransactionHistory = async () => {
    return await axios.get(backendURL+'/api/transaction/uuid')
        .then(res => res.data);
};

export const cancelTransaction = (transaction, stripe, animal) => {
    axios.patch(backendURL+'/api/transaction/cancel', {
        id: transaction,
        stripeId: stripe,
        animalId: animal
    }).then(() => console.log("transaction canceled")).catch(err => console.log(err))
};
