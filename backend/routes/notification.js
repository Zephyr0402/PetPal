var express = require('express');
var router = express.Router();
const NotificationInfo = require('../models/notificationinfoModel');

router.post('/api/notify/like', async(req, res) => {
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
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;