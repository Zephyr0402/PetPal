var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Comment = require('../models/commentModel');
const {UserInfo} = require('../models/userModel');

router.get('/api/getuuid', async (req, res) => {
    return res.send(uuidv4())
})

//post comment
router.post('/api/comment', async (req, res) => {
    const comment = await Comment.create({
        'ucid' : uuidv4(),
        'cmtorid' : req.session.uuid,
        'uaid' : req.body.uaid === undefined ? -1 : req.body.uaid,
        'uuid' : req.body.uuid === undefined ? "" : req.body.uuid,
        'fcid' : req.body.fcid === undefined ? "" : req.body.fcid,
        'content' : req.body.content,
        'time' : req.body.time,
        'likes' : 0,
        'dislikes' : 0,
        'replies' : []
    })

    if(comment.fcid.length > 0){
        await Comment.updateOne({
            'ucid' : comment.fcid
        },{
            '$push' : {'replies' : comment.ucid}
        })
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
            'uuid' : cmtorid
        })

        userComments.push({
            'name': userInfo.name,
            'avatar': userInfo.avatar,
            'content' : c.content,
            'time' : c.time,
            'likes' : c.likes,
            'dislikes' : c.dislikes
        })
    }

    return res.send(userComments);

})

//comments for user
router.get('/api/comment/animal/:uaid', async (req, res) => {
    const animalCommentsFromDB = await Comment.find({
        'uaid' : req.params.uaid
    })

    var animalComments = []
    for(let c of animalCommentsFromDB){
        const userInfo = await UserInfo.findOne({
            'uuid' : c.cmtorid
        }, 'name avatar')

        const repliesFromDB = await Comment.find({
            'fcid' : c.ucid
        }, 'cmtorid content time likes dislikes')

        var replies = [];
        for(let r of repliesFromDB){
            const repliesUserInfo = await UserInfo.findOne({
                'uuid' : r.cmtorid
            }, 'name avatar')

            replies.push({
                'name' : repliesUserInfo.name,
                'avatar': repliesUserInfo.avatar,
                'content' : r.content,
                'time' : r.time,
                'likes' : r.likes,
                'dislikes' : r.dislikes,
            })
        }

        animalComments.push({
            'name': userInfo.name,
            'avatar': userInfo.avatar,
            'content' : c.content,
            'time' : c.time,
            'likes' : c.likes,
            'dislikes' : c.dislikes,
            'replies' : replies
        })
    }

    return res.send(animalComments);
})

module.exports = router;