require("dotenv").config();
//Must set environment variable STRIPE_SECRET_TEST in your OS to test this
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const Transaction = require('../models/transactionModel');

//Update transaction status to "complete" after 2 hours the payment is made
function updateTransactionStatus() {

    Transaction.find()
        .then(transactions => {
            let completeTransaction = transactions.filter(transaction => transaction.status === "pending" && transaction.timestamp < new Date() - 7200000);
            if(completeTransaction.length > 0){
                completeTransaction.map(transaction => {
                    Transaction.findByIdAndUpdate(transaction._id, {status: "completed"})
                        .then(() =>  console.log("Transaction updated to 'completed'"))
                        .catch(error => console.log("Fail to update transaction: " + error));

                    const stripePayment = stripe.paymentIntents.confirm(transaction.stripeId);
                    stripePayment
                        .then(() => console.log("Stripe payment confirmed"))
                        .catch(error => console.log("Fail to confirm payment: " + error));
                })
            }
        })
        .catch(error => console.log("Cannot retrieve transaction: " + error));
}

module.exports = updateTransactionStatus;
