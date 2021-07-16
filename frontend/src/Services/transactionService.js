import backendURL from "./backendURL";

const millisecInAndHour = 3600000;
const pendingStatusTimeLimit = 2;

export const TRANSACTION_STATUS = {
    COMPLETE: "complete",
    PENDING: "pending",
    CANCELED: "canceled"
};

export const fetchTransactionList = async () => {
    const res = await fetch(backendURL + '/api/transaction', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return res.json();
};


//Update transaction status to "complete" after 2 hours
//Should be called in Main's useEffect so the status is immediately updated when the site is loading
export const updateTransactionStatusToCompleted = async () => {

   await fetch(backendURL + '/api/transaction', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
   }
    })
    .then(res => res.json())
    .then(data => {
        data.map(d => {
            if((new Date() - new Date(d.timestamp))/millisecInAndHour > pendingStatusTimeLimit && d.status.trim() === TRANSACTION_STATUS.PENDING){
                const transaction = {
                    id: d._id,
                    status: TRANSACTION_STATUS.COMPLETE
                };

                fetch(backendURL + "/api/transaction/update_status", {
                    method: "PATCH",
                    headers: new Headers({
                        "Content-Type": "application/json",
                    }),
                    body: JSON.stringify(transaction)
                }).then(res => {
                    if(res.status === 200) {
                        console.log("transaction status successfully updated");
                    }else if(res.status >= 400){
                        console.log("transaction status fail to updated");
                    }
                });
            }
        })
    });
};
