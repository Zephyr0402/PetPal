var express = require('express');
var router = express.Router();
const NotificationInfo = require('../models/notificationinfoModel');
const AnimalInfo = require('../models/animalinfoModel');
// {}
router.post('/comment', async function (req, res) {
    console.log('Update one comment notification');
    try {
        // Find seller id
        const infos = await AnimalInfo.find({ "id": req.body.uaid }).populate('userinfo');
        const sourceUserID = infos.userinfo.uuid;
        const destinationUserID = req.session.uuid;
        const contentID = "";
        await NotificationInfo.create({
            type: "comment",
            sourceUserID: sourceUserID,
            destinationUserID: destinationUserID,
            contentID: contentID,
            timestamp: Date.now()
        })
    } catch (err) {
        console.log(err);
    }
});

router.get('/comment/:dstUserID/:timestamp', function (req, res) {
    console.log('Get updated comment notification');
    const dstUserID = req.params.dstUserID;
    const timestamp = Data.parse(req.params.timestamp);
    const infos = await NotificationInfo.find({ "destinationUserID": dstUserID });
    var resInfos = [];
    for (let info in infos) {
        const infoDate = Date.parse(info.timestamp);
        if (dates.compare(infoDate, timestamp) >= 0) {
            resInfos.push(info);
        }
    }
    res.send(resInfos);
});

module.exports = router;