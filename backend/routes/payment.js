var express = require('express');
var router = express.Router();
const cors = require("cors");
require("dotenv").config();
//Must set environment variable STRIPE_SECRET_TEST in your OS to test this
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const Transaction = require('../models/transaction');

router.post("/", cors(), async (req, res) => {
    let transaction = req.body;

    console.log("transaction", transaction);

    try {
        const payment = await stripe.paymentIntents.create({
            amount: transaction.price * 100,
            currency: "CAD",
            description: "PetPal",
            payment_method: transaction.id,
            confirm: true
        });
        console.log("Payment", payment);

        const newTransaction = new Transaction({
            orderNumber: transaction.orderNumber,
            buyerId: transaction.buyerId,
            sellerId: transaction.sellerId,
            animalId: transaction.animalId,
            timestamp: transaction.timestamp,
            price: transaction.price,
            status: transaction.status,
            tag: transaction.tag
        });

        await newTransaction.save()
            .then(() => res.json({
                message: "Payment Successful",
                success: true
            }))
            .catch(error => res.status(400).json('Error: ' + error));

    }catch (err) {
        console.log("Error", err);
        res.json({
            message: "Payment Failed",
            success: false
        }).then().catch();
    }
});

module.exports = router;
