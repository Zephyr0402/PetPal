var express = require('express');
const { UserInfo } = require('../models/userModel');
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
    console.log("uuid", req.session.uuid)
    const channels = await Channel.find({
        'members' : {'$in' : [req.session.uuid]}
    })
    console.log("channels:",channels)
    var c = []
    for(let channel of channels){
        if(channel.members.length == 2){
            
            const u = channel.members[0]==req.session.uuid ? channel.members[1] : channel.members[0] 
            const ui = await UserInfo.findOne({
                'uuid' : u
            })
            c.push(
                {
                    'cid' : channel.cid,
                    'avatar' : ui.avatar,
                    'name' : ui.name
                }
            )
        }
        else{
            c.push({
                'cid' : channel.cid,
                'name' : channel.name
            })
        }
    }
    console.log("c:",c)
    res.send(c)
})

//get whispers in a channel
router.get('/api/channel/:cid', async (req, res) => {
    await Whisper.updateMany({
        'cid' : req.params.cid
    }, {
        '$pull' : { 'unread' : req.session.uuid}
    })

    const whispers = await Whisper.find({
        'cid' : req.params.cid
    })

    var w = []
    for(let whisper of whispers){
        const ui = await UserInfo.findOne({
            'uuid' : whisper.sender
        })
        w.push({
            'whisper' : {
                'sender' :{
                    'uuid' : whisper.sender,
                    'avatar' : ui.avatar
                },
                'content' : whisper.content
            },
            'uuid' : req.session.uuid
        })
    }

    res.send(w)
})

//get unread whispers
router.get('/api/whisper/unread', async (req, res) => {
    const unreadWhispers = await Whisper.find({
        'unread' : {'$in' : [req.session.uuid]}
    })

    const channels = await Channel.find({
        'members' : {'$in' : [req.session.uuid]}
    })

    var u = {}
    for(let channel of channels){
        u[channel.cid] = 0
    }
    
    for(let uw of unreadWhispers){
        u[uw.cid] += 1
    }
    
    res.send(u)
})

router.get('/api/whisper/fake/channel', async (req, res) => {
    const channels = await Channel.find()
    res.send(channels)
})

router.get('/api/whisper/fake/whisper/:cid', async (req, res) => {
    const whispers = await Whisper.find({
        'cid' : req.params.cid
    })

    res.send(whispers)
})

module.exports = router;