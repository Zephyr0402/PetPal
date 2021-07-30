var express = require('express');
var router = express.Router();
const cors = require("cors");

require("dotenv").config();
//Must set environment variable STRIPE_SECRET_TEST in your OS to test this
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const Transaction = require('../models/transactionModel');
const AnimalInfo = require('../models/animalinfoModel');

//GET all transactions
router.get("/", cors(), async (req, res) => {
    Transaction.find()
        .then(transactions => res.json(transactions))
        .catch(error => res.status(400).json('Error: ' + error));
});

// Get transaction histories for the current user
router.get("/uuid", async (req, res) => {
    console.log("tramsaction be ", req.session);
    if(req.session.uuid === undefined){
        console.log("Session is expired")
        res.send([])
    } else {
        console.log("start find transaction history");
        await Transaction.find({
            $or:[ { 'buyerId': req.session.uuid }, { 'sellerId': req.session.uuid } ]
        }, (err, doc) => {
            if(err){
                res.status(404).send({
                    message: "Something wrong when getting the transaction history"
                })
            } else {
                console.log(doc);
                res.send(doc);
            }
        });
    }
});

router.post("/add", cors(), async (req, res) => {
    let transaction = req.body;

    try {
        const stripePayment = await stripe.paymentIntents.create({
            amount: transaction.price * 100,
            currency: "CAD",
            description: "PetPal",
            payment_method: transaction.id,
            //confirm will be set to true after 2 hours
            confirm: false
        });

        console.log("Payment", stripePayment.id);

        const newTransaction = new Transaction({
            buyerId: transaction.buyerId,
            sellerId: transaction.sellerId,
            animalId: transaction.animalId,
            timestamp: transaction.timestamp,
            price: transaction.price,
            status: transaction.status,
            tag: transaction.tag,
            stripeId: stripePayment.id
        });

        await newTransaction.save()
            .then(() =>
                res.json({
                message: "Successfully add transaction",
                success: true,
                data: newTransaction
            }))
            .catch(error => res.status(400).json('Fail to add transaction: ' + error));

        AnimalInfo.updateOne({_id: transaction.animalId}, {status: "sold"})
            .then(() => console.log("Animal status updated to 'sold'"))
            .catch(err => console.log("Fail to update animal status: " + err));

    }catch (error) {
        await res.json({
            message: "Fail to post Stripe payment: " + error,
            success: false
        })
    }
});

/*
Cancel payment

request body example:
 {
     "id": TRANSACTION_ID,
     "stripeId": STRIPE_ID,
     "animalId": ANIMAL_ID
 }
 */
router.patch("/cancel", cors(), async (req, res) => {
    let transaction = req.body;

    //cancel Stripe payment
    const stripePayment = stripe.paymentIntents.cancel(transaction.stripeId);
    stripePayment
        .then(() => {
            console.log("Stripe payment canceled");

            //Update transaction status to "canceled"
            Transaction.updateOne({_id : transaction.id}, {status : "canceled"})
                .then(() => {

                    //change animal status back to 'available'
                    AnimalInfo.updateOne({_id: transaction.animalId}, {status: "available"})
                        .then(() => res.status(200).json("Transaction successfully 'canceled'"))
                        .catch(error => console.log("Fail to update animal status: " + error));
                })
                .catch(error => console.log("Fail to update transaction status: " + error))
        })
        .catch(error => console.log("Fail to cancel Stripe payment: " + error));

});

module.exports = router;
