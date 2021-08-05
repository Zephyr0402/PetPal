var express = require('express');
var router = express.Router();
const {Whisper, Channel} = require('../models/whisperModel')

//http APIs
const randomString = () => {    
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz",
    a = t.length,
    n = "";
    for (i = 0; i < 8; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}

//create channel
router.post('/api/channel', async (req, res) => {
    var name;
    if(req.body.members.length == 2){
        name = "";
    }
    else{
        name = req.body.name
    }

    var mbs = req.body.members
    mbs.push(req.session.uuid)
    await Channel.create({
        'cid' : randomString(),
        'name' : name,
        'members' :mbs
    })

    res.send("ok")
})

//get all channels
router.get('/api/channel', async (req, res) => {
    const channels = await Channel.find({
        'members' : {'$in' : [req.session.uuid]}
    })
    res.send(channels)
})

//get whispers in a channel
router.get('/api/channel/:cid', async (req, res) => {
    await Whisper.updateMany({
        'cid' : req.params.cid
    }, {
        '$pull' : { 'unread' : req.session.uuid}
    })

    const whispers = await Whipser.find({
        'cid' : req.params.cid
    })

    res.send(whispers)
})

//get unread whispers
router.get('/api/whisper/unread', async (req, res) => {
    const unreadWhispers = await Whisper.find({
        'unread' : {'$in' : [req.session.uuid]}
    })
    res.send(unreadWhispers.length)
})

module.exports = router;