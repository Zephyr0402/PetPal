var express = require('express');
var router = express.Router();
const cors = require("cors");

require("dotenv").config();
//Must set environment variable STRIPE_SECRET_TEST in your OS to test this
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const Transaction = require('../models/transactionModel');
const AnimalInfo = require('../models/animalinfoModel');
const { UserInfo } = require('../models/userModel');

//GET all transactions
router.get("/", cors(), async (req, res) => {
    Transaction.find()
        .then(transactions => res.status(200).json(transactions))
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
        }, async(err, docs) => {
            if(err){
                res.status(404).send({
                    message: "Something wrong when getting the transaction history"
                })
            } else {
                // var docForJson;
                // console.log(docs);
                var newDocs = [];
                for(let doc of docs){    
                    doc = JSON.parse(JSON.stringify(doc))

                    try{
                        const udoc = await UserInfo.find({'uuid': doc.buyerId}, 'name');
                        // console.log(doc._id)
                        // console.log("0 " + udoc[0]);
                        doc.buyerName = udoc[0].name;

                        const udoc2 = await UserInfo.find({'uuid': doc.sellerId}, 'name');
                        // console.log("1 " + udoc2[0]);
                        doc.sellerName = udoc2[0].name;

                        const animalInfo = await AnimalInfo.find({'_id': doc.animalId}, 'name image');
                        // console.log("2 " + animalInfo[0].name)
                        doc.animalName = animalInfo[0].name;
                        doc.animalImg = animalInfo[0].image;
                        newDocs.push(doc);
                    }catch(err) {
                        console.log(err);
                        return res.status(400).json('Fail to get transaction: ' + err)
                    }
                }
                // console.log(newDocs);
                res.send(newDocs);
            }
        });
    }
});

router.post("/add", cors(), async (req, res) => {
    let transaction = req.body;

    const stripePaymentPromise = stripe.paymentIntents.create({
        amount: transaction.price * 100,
        currency: "CAD",
        description: "PetPal",
        payment_method: transaction.id,
        //confirm will be set to true after 2 hours
        confirm: false
    });

    const txPromise = stripePaymentPromise
        .then((stripePayment) => {
            console.log("Payment", stripePayment.id);

            return new Transaction({
                buyerId: transaction.buyerId,
                sellerId: transaction.sellerId,
                animalId: transaction.animalId,
                timestamp: transaction.timestamp,
                price: transaction.price,
                status: transaction.status,
                tag: transaction.tag,
                stripeId: stripePayment.id
            });
        });

    const result = txPromise
        .then((newTransaction) => {
            newTransaction.save()
                .then(() => {
                    return AnimalInfo.updateOne({_id: transaction.animalId}, {status: "sold"})
                        .then(() => console.log("Animal status updated to 'sold'"))
                        .catch(err => console.log("Fail to update animal status: " + err));
                })
                .then(() => {
                    return res.json({
                        message: "Successfully add transaction",
                        success: true,
                        data: newTransaction
                    })
                })
                .catch(error => {
                    console.log("Error adding transaction to DB: " + error);
                    return res.status(400).json('Fail to add transaction: ' + error)
                });
        })
        .catch(error => {
            console.log("Failed to process payment: " + error);
            return res.status(400).json({
                message: "Fail to process payment: " + error,
                success: false
            });
        });

    return result;
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
