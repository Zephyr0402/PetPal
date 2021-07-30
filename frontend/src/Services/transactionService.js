import backendURL from "./backendURL";
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getTransactionHistory = async () => {
    return await axios.get(backendURL+'/api/transaction/uuid')
        .then(res => res.data);
};

export const cancelTransaction = async (transaction, stripe, animal) => {
    const toBeCanceled = {
        id: transaction,
        stripeId: stripe,
        animalId: animal
    };

    return fetch(backendURL + "/api/transaction/cancel", {
        method: "PATCH",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(toBeCanceled)
    }).then(res => {
        if(res.status === 200) {
            return true;
        }else if(res.status >= 400){
            throw new Error("Fail to remove animal from wishlist");
        }
    });
};
