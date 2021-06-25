var express = require('express');
var router = express.Router();
const cors = require("cors");
require("dotenv").config();
//Set environment variable STRIPE_SECRET_TEST in your OS
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

router.post("/", cors(), async (req, res) => {
    let {amount, id} = req.body;

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "CAD",
            description: "PetPal",
            payment_method: id,
            confirm: true
        });
        console.log("Payment", payment);

        res.json({
            message: "Payment Successful",
            success: true
        });
    }catch (err) {
        console.log("Error", err);
        res.json({
            message: "Payment Failed",
            success: false
        })
    }
});

module.exports = router;
