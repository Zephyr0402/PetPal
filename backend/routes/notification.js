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

module.exports = router;