import backendURL from "./backendURL";
import axios from 'axios';
import {errorModal} from "./modal";

axios.defaults.withCredentials = true;

export const getTransactionHistory = async () => {
    return await axios.get(backendURL+'/api/transaction/uuid')
        .then(res => res.data);
};

export const cancelTransaction = async (uuid, sellerId, transactionId, stripe, animalId) => {
    const toBeCanceled = {
        id: transactionId,
        stripeId: stripe,
        animalId: animalId
    };

    return fetch(backendURL + "/api/transaction/cancel", {
        method: "PATCH",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(toBeCanceled)
    }).then(res => {
        if(res.status === 200) {

            const notification = {
                destinationUserID: sellerId,
                contentID: transactionId,
            };

            fetch(backendURL + "/api/notify/transaction/cancel&" + uuid, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(notification)
            }).then(res => {
                res.text().then(text => console.log(text));
            }).catch(err => console.log(err));

            return true;
        }else if(res.status >= 400){
            errorModal("There is an error canceling the transaction. Please try again.")
        }
    });
};
