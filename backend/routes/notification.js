var express = require('express');
var router = express.Router();
const NotificationInfo = require('../models/notificationinfoModel');

router.post('/like', async(req, res) => {
    console.log('start notify like');
    if(req.session.uuid === undefined){
        return res.send({
            message : "Your session has expired. Please log in again!"
        })  
    }

    const newNotification = new NotificationInfo({
        type: 'like',
        sourceUserID: req.session.uuid,
        destinationUserID: req.body.duid,
        contentID: req.body.ucid,
        timestamp: new Date(),
    });

    try {
        await newNotification.save();
        return res.send({
            message : "Successfully add notification"
        }) 
    } catch (err) {
        console.log(err);
    }
})
const cors = require("cors");

router.get('/comment/:dstUserID/:timestamp', async (req, res) => {
    console.log('Get updated comment notification');
    const dstUserID = req.params.dstUserID;
    const infos = await NotificationInfo.find({ "destinationUserID": dstUserID, "type": "comment" });
    var resInfos = [];
    if (req.params.timestamp === "empty") {
        resInfos = infos;
    } else {
        const timestamp = Data.parse(req.params.timestamp);
        for (let info in infos) {
            const infoDate = Date.parse(info.timestamp);
            if (dates.compare(infoDate, timestamp) >= 0) {
                resInfos.push(info);
            }
        }
    }
    res.send(resInfos);
});


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
