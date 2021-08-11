var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Comment = require('../models/commentModel');
const { UserInfo } = require('../models/userModel');
const AnimalInfo = require('../models/animalinfoModel');
const NotificationInfo = require('../models/notificationinfoModel');

router.get('/api/getuuid', async (req, res) => {
    return res.send(uuidv4())
})

//post comment
router.post('/api/comment', async (req, res) => {
    const comment = await Comment.create({
        'ucid' : uuidv4(),
        'cmtorid' : req.session.uuid,
        'uaid' : req.body.uaid === undefined ? "" : req.body.uaid,
        'uuid' : req.body.uuid === undefined ? "" : req.body.uuid,
        'fcid' : req.body.fcid === undefined ? "" : req.body.fcid,
        'content' : req.body.content,
        'time' : req.body.time,
        'likes' : [],
        'dislikes' : [],
        'replies' : []
    })

    if(comment.fcid.length > 0){
        await Comment.updateOne({
            'ucid' : comment.fcid
        },{
            '$push' : {'replies' : comment.ucid}
        })
    }

    // update one comment notification
    try {
        // Find seller id
        const infos = await AnimalInfo.findOne({ "id": req.body.uaid }).populate('userinfo');
        const sourceUserID = infos.userinfo.uuid;
        const destinationUserID = req.session.uuid;
        const contentID = comment.ucid;
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

    return res.send({
        message: "Commented successfully!"
    })
})


//comments for user
router.get('/api/comment/user/:uuid', async (req, res) => {
    const userCommentsFromDB = await Comment.find({
        'uuid' : req.params.uuid
    })

    var userComments = []
    for(let c of userCommentsFromDB){
        const userInfo = await UserInfo.findOne({
            'uuid' : c.cmtorid
        })

        var liked = false;
        var disliked = false;
        for(let like of c.likes){
            if(like == req.session.uuid){
                liked = true
                break
            }
        }

        var disliked = false;
        for(let dislike of c.dislikes){
            if(dislike == req.session.uuid){
                disliked = true
                break
            }
        }

        userComments.push({
            'cmtorid' : c.cmtorid,
            'ucid' : c.ucid,
            'name': userInfo.name,
            'avatar': userInfo.avatar,
            'content' : c.content,
            'time' : c.time,
            'liked' : liked,
            'likes' : c.likes,
            'dislikes' : c.dislikes,
            'disliked' : disliked,
            'replies' : [],
            'canReply' : false
        })
    }

    return res.send(userComments);

})

//comments for animals
router.get('/api/comment/animal/:uaid', async (req, res) => {
    const animalCommentsFromDB = await Comment.find({
        'uaid' : req.params.uaid
    })

    var animalComments = []
    for(let c of animalCommentsFromDB){
        const userInfo = await UserInfo.findOne({
            'uuid': c.cmtorid
        }, 'name avatar');

        if (userInfo === null) {
            return res.send("");
        }

        const repliesFromDB = await Comment.find({
            'fcid' : c.ucid
        })

        var replies = [];
        for(let r of repliesFromDB){
            const repliesUserInfo = await UserInfo.findOne({
                'uuid' : r.cmtorid
            }, 'name avatar')

            let liked = false
            for(let like of r.likes){
                if(like == req.session.uuid){
                    liked = true
                    break
                }
            }

            
            var disliked = false;
            for(let dislike of r.dislikes){
                if(dislike == req.session.uuid){
                    disliked = true
                    break
                }
            }
            replies.push({
                'cmtorid' : r.cmtorid,
                'ucid' : r.ucid,
                'name' : repliesUserInfo.name,
                'avatar': repliesUserInfo.avatar,
                'content' : r.content,
                'time' : r.time,
                'likes' : r.likes,
                'liked' : liked,
                'dislikes' : r.dislikes,
                'disliked' : disliked,
                'canReply' : false
            })
        }

        let liked = false
        for(let like of c.likes){
            if(like == req.session.uuid){
                liked = true
                break
            }
        }
        
        var disliked = false;
        for(let dislike of c.dislikes){
            if(dislike == req.session.uuid){
                disliked = true
                break
            }
        }


        animalComments.push({
            'cmtorid' : c.cmtorid,
            'ucid' : c.ucid,
            'name': userInfo.name,
            'avatar': userInfo.avatar,
            'content' : c.content,
            'time' : c.time,
            'likes' : c.likes,
            'liked' : liked,
            'dislikes' : c.dislikes,
            'replies' : replies,
            'disliked' : disliked,
            'canReply' : true
        })
    }

    return res.send(animalComments);
})

router.post('/api/comment/like/:type/:ucid', async (req, res) => {
    const uuid = req.session.uuid;

    const comment = await Comment.findOne({
        'ucid' : req.params.ucid
    })
    if(req.params.type == "set"){
        await Comment.updateOne({
            'ucid' : req.params.ucid
        },{
            '$push' : {'likes' : uuid}
        })
        return res.send("liked!")
    }else{
        await Comment.updateOne({
            'ucid' : req.params.ucid
        },{
            '$pull' : {'likes' : uuid}
        })
        return res.send("Canceled like!")
    }
})

router.post('/api/comment/dislike/:type/:ucid', async (req, res) => {
    const uuid = req.session.uuid;

    const comment = await Comment.findOne({
        'ucid' : req.params.ucid
    })

    if(req.params.type == "set"){
        await Comment.updateOne({
            'ucid' : req.params.ucid
        },{
            '$push' : {'dislikes' : uuid}
        })
        return res.send("Disliked!")
    }else{
        await Comment.updateOne({
            'ucid' : req.params.ucid
        },{
            '$pull' : {'dislikes' : uuid}
        })
        return res.send("Canceled dislike!")
    }
})

module.exports = router;