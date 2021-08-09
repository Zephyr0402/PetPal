var express = require('express');
var router = express.Router();
const cors = require("cors");

const NotificationInfo = require('../models/notificationinfoModel');

router.post("/transaction/:type&:uuid", cors(), (req, res) => {
    const notification = req.body;
    const parameters = req.params;

    const newNotification = new NotificationInfo({
        type: "transaction_" + parameters.type,
        sourceUserID: parameters.uuid,
        destinationUserID: notification.destinationUserID,
        contentID: notification.contentID,
        timestamp: new Date(),
    });

     newNotification.save()
        .then(() => res.status(200).json("Successfully add transaction to the notification info"))
        .catch(error => res.status(400).json('Fail to add transaction to the notification info ' + error));
});

module.exports = router;
