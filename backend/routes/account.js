var express = require('express');
var bcypt = require('bcrypt');
var router = express.Router();
router.use(express.json())
var session = require('express-session');
var cors = require('cors');
var formidable = require("formidable");
var uuid = require('uuid');
const {User, UserInfo} = require('../models/userModel');

const defaultAvatar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADHElEQVRYR9WXO2gUYRDH/7Mb5QobsUoURAQFC0EUERRRiNqolQ9ERRsTFFSMt/Nl01wszPnNXUghgo9CEBsjVgoxikQDdknno/WFKGgXG737RhbuwmZzr1XD4QfX7H0z89t5L6HNh9psH/8XgIjsBrALwFYAnQC6APwA8AXAVwBPVfWJMWaqVc+25AEROQLgvKouJaKH5XL5ke/7HzOZzKeZmZklnud1eZ63BsBeAPsAPPY8byibzb5pBtIUQERGAaxS1VvGmJvNFFpru4ioF0D0Y2a+00imIYCIvALwhpkPNTOc/L9YLK5zzo0S0UQQBGfrydcFsNZGcb1ujBlMazx+X0QmAPxk5j219NQEEJFxIpoOgmDgb4xXZSsQU8wcJPXNA7DWHieiU8y8PabgNYB1AF6oarZelltrjxLR5Up1XGDma5GOfD6/wfO8SQCbjTFv4xDzAETku3PuWH9//1gMQGNCJQAPiGhcVavPVxPRPlVdAWBZdFdVp40xm6pyhUIhdM6tN8ZEFTV75gAUCoX1qjrGzMsTcYwDtBqVl8y8LaHnPTOvrAsgIgNEtCgIgkv/AOAZM3fH9Vhrp5xzvWEYTlefz/GAiCgz1wrLn3jgETNHTWn2iMhBAAfjZb1gAKo6aow5HAfI5/M7fN8/UxOgWCxuLJfLN+KJUycJW82B+8kGFgF0dHT0BUGwf14IhoeH15RKpYfGmLVJC1FoWrUau3eHmU/U8ECOmXcueA6oatRFT/81gIicBHA7rQdUddI5lwvD8HkslE2TcEBVF1f7f8X1d6MZT0QNp1oC8JeqDhHRYVW9V9XXtAyTjShKGgAffN+/EpVPCi98B9CXHMUi0rgRRQaSrbhSOuecc2Oe5zXdBwB8ds4N+r7fHQTBbBm21IojgFrDqPrm1totAC4S0YEa3iir6lXf9y9ns9lvieRrfRhVvNBwHOdyuY5MJhMNntkThuG7eiFKNY5jb9u+hSRWNu1byWIQqZbSkZGRzlKp1KOqPQCGqktJvfA03YorOdG+tTxO3rYPkxQNKPXVlkKQWmsKgbYD/AY9Y8AwjKjyOAAAAABJRU5ErkJggg==";
const cookieMaxAge = 10*1000;//10 seconds
const SECRET = "znhy";

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: 'Content-type',
    credentials: true
}

router.use(cors(corsOptions));

router.use(session({
    name: "sid",
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        maxAge: cookieMaxAge, 
        secure:false
    }
}));

const encryptPWD = async (req, res, next) => {
    req.body.password = bcypt.hashSync(req.body.password, 10);
    next();
}

//register
router.post('/api/register', encryptPWD, async(req, res) => {
    //check username duplicate
    const user = await UserInfo.findOne({
        'email' : req.body.email
    })

    if(user){
        return res.status(422).send({
            messgae : "It seems like we already have an account for this email address!"
        });
    }

    //write to db
    //user stores merely a map between uuid and pwd
    //it should not be accessed anywhere except /api/login
    //userinfo stores information about that user
    const newUUid = uuid.v4();
    await User.create({
        'uuid' : newUUid,
        'password' : req.body.password
    })
    await UserInfo.create({
        'uuid' : newUUid,
        'name' : req.body.name,
        'email' : req.body.email,
        'avatar' : defaultAvatar
    });

    //return success message
    res.send({
        message: "Welcome to the Petpal!"
    });
})

//login
router.post('/api/login',  async (req, res) => {
    //check if user exists
    const userinfo = await UserInfo.findOne({
        'email' : req.body.email
    })

    if(!userinfo){
      return res.status(422).send({
          message : "user does not exist!"
      });
    }
  
    //check if password is correct
    const user = await User.findOne({
        'uuid' : userinfo.uuid
    })

    const isPwdValid = bcypt.compareSync(
        req.body.password,
        user.password
    )
  
    if(!isPwdValid){
      return res.status(422).send({
          message : "incorrect password!"
      });
    }
    
    //return uuid
    res.send({
        uuid: user.uuid
    });
  });

router.get('/api/logout', async(req, res) => {
    //clear uuid in session
    req.session.uuid = undefined;

    res.send({
        message : "Log out successfully!"
    })
})

router.get('/api/cur_user/info', async (req,res) => {
    //not logged in
    if(req.session.uuid === undefined){
        res.status(422).send({
            message : "Your session has expired. Please log in again!"
        })
    }

    //return user information
    const user = await UserInfo.findOne({
        'uuid' : req.session.uuid
    },'name email avatar', function (err, doc){
        if(err){
            res.status(404).send({
                message: "User does not exist!"
            })
        }
        else{
            res.send(doc);
        }
    })
})

router.get('/api/cur_user/:uuid?', async (req,res) => {
    uuid = req.params.uuid;
    if(uuid === undefined){
        //in a session
        if(req.session.uuid){
            return res.send({
                uuid : req.session.uuid
            })
        }
        //not in a session
        else{
            res.status(422).send({
                message: "Not logged in!"
            })
        }
    }
    //This branch can only be taken when you want to store uuid in cookies after login
    //If you want to store cookies for test purposes, 
    //you can look up your db for uuid and put it in the params
    else{
        req.session.uuid = uuid;
        res.cookie({signed: true});
        return res.send({
            message: "uuid stored in cookie!"
        })
    }
})

module.exports = router;