var express = require('express');
var router = express.Router();
const cors = require("cors");

const Transaction = require('../models/transactionModel');

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
        res.send({
            message : "Your session has expired. Please log in again!"
        })
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
        const newTransaction = new Transaction({
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
                message: "Transaction Successfully Created",
                success: true,
                data: newTransaction.orderNumber
            }))
            .catch(error => res.status(400).json('Error: ' + error));

    }catch (err) {
        console.log("Error", err);
        res.json({
            message: "Failed to Add Transaction",
            success: false
        }).then().catch();
    }
});


module.exports = router;
