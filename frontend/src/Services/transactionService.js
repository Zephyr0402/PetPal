import backendURL from "./backendURL";

export const verifyAndUpdatePaymentStatus = async () => {

   await fetch(backendURL + '/api/transaction', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(data => {
        data.map(d => {
            if((new Date() - new Date(d.timestamp))/3600000 > 2 && d.status === "pending"){
                const transaction = {
                    id: d._id,
                    status: "completed"
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


export const fetchTransactionList = async () => {
    const res = await fetch(backendURL + '/api/transaction', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return res.json();
};
