var express = require('express');
var router = express.Router();
const NotificationInfo = require('../models/notificationinfoModel');

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

module.exports = router;