var express = require('express');
var bcypt = require('bcrypt');
var router = express.Router();
router.use(express.json())
var cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const nodeMailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const crypto = require('crypto') 
const formidable = require("formidable");
const fs = require('fs');
const mineType = require('mime-types');

const {User, UserInfo, UserAuth, UserReset} = require('../models/userModel');

const defaultAvatar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADHElEQVRYR9WXO2gUYRDH/7Mb5QobsUoURAQFC0EUERRRiNqolQ9ERRsTFFSMt/Nl01wszPnNXUghgo9CEBsjVgoxikQDdknno/WFKGgXG737RhbuwmZzr1XD4QfX7H0z89t5L6HNh9psH/8XgIjsBrALwFYAnQC6APwA8AXAVwBPVfWJMWaqVc+25AEROQLgvKouJaKH5XL5ke/7HzOZzKeZmZklnud1eZ63BsBeAPsAPPY8byibzb5pBtIUQERGAaxS1VvGmJvNFFpru4ioF0D0Y2a+00imIYCIvALwhpkPNTOc/L9YLK5zzo0S0UQQBGfrydcFsNZGcb1ujBlMazx+X0QmAPxk5j219NQEEJFxIpoOgmDgb4xXZSsQU8wcJPXNA7DWHieiU8y8PabgNYB1AF6oarZelltrjxLR5Up1XGDma5GOfD6/wfO8SQCbjTFv4xDzAETku3PuWH9//1gMQGNCJQAPiGhcVavPVxPRPlVdAWBZdFdVp40xm6pyhUIhdM6tN8ZEFTV75gAUCoX1qjrGzMsTcYwDtBqVl8y8LaHnPTOvrAsgIgNEtCgIgkv/AOAZM3fH9Vhrp5xzvWEYTlefz/GAiCgz1wrLn3jgETNHTWn2iMhBAAfjZb1gAKo6aow5HAfI5/M7fN8/UxOgWCxuLJfLN+KJUycJW82B+8kGFgF0dHT0BUGwf14IhoeH15RKpYfGmLVJC1FoWrUau3eHmU/U8ECOmXcueA6oatRFT/81gIicBHA7rQdUddI5lwvD8HkslE2TcEBVF1f7f8X1d6MZT0QNp1oC8JeqDhHRYVW9V9XXtAyTjShKGgAffN+/EpVPCi98B9CXHMUi0rgRRQaSrbhSOuecc2Oe5zXdBwB8ds4N+r7fHQTBbBm21IojgFrDqPrm1totAC4S0YEa3iir6lXf9y9ns9lvieRrfRhVvNBwHOdyuY5MJhMNntkThuG7eiFKNY5jb9u+hSRWNu1byWIQqZbSkZGRzlKp1KOqPQCGqktJvfA03YorOdG+tTxO3rYPkxQNKPXVlkKQWmsKgbYD/AY9Y8AwjKjyOAAAAABJRU5ErkJggg==";
// const cookieMaxAge = 60*60*1000;//30 seconds
const codeMaxAge = 1000*60*1;//1 minute
const resetTokenMaxAge = 1000*60*1;//1 minute
// const SECRET = "znhy";

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}

const randomFns=()=> {
    let code = ""
    for(let i= 0;i<6;i++){
        code += parseInt(Math.random()*10)
    }
    return code 
}
const regEmail=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/

router.use(cors(corsOptions));

// router.use(session({
//     name: "sid",
//     secret: SECRET,
//     resave: true,
//     saveUninitialized: true,
//     rolling: true,
//     cookie: {
//         maxAge: cookieMaxAge, 
//         secure:false
//     }
// }));

router.post('/api/auth',async(req, res) =>{
    const EMAIL=req.body.email
    if(!regEmail.test(EMAIL)){
        return res.status(422).send({
            message: "Not a correct email address!"
        })
    }

    //create a transporter
    const transporter = nodeMailer.createTransport(smtpTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        secure: true,
        port:465,
        auth: {
            user: 'petpal455official@gmail.com',
            pass: '2021petpal455'
        }
    }))

    //send code
    let code = randomFns()
    transporter.sendMail({
        from: 'petpal455official@gmail.com',
        to: EMAIL,
        subject: 'Verify your Petpal account!',
        html: `
            <p>Welcom to Petpal!</p>
            <p>You have tried to register for our app!</p>
            <p>Your verification code：<strong style="color: #ff4e2a;">${code}</strong></p>
            <p>***This code is valid for the next one minute***</p>`
    }, function(error, data) {
        if(error){
            transporter.close();
            return res.status(500).send({
                message: "Error sending verification code"
            })
        }
    })

    await UserAuth.deleteMany({
        'email' : EMAIL
    })

    //store code into db
    await UserAuth.create({
        'email' : EMAIL,
        'code' : code
    })

    res.send({
        message: "code sent!"
    })
    //set expiry time
    setTimeout(async()=>{
        await UserAuth.deleteMany({
            'email' : EMAIL
        })
    },codeMaxAge)
})

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
            messgae : "We already have an account for this email address!"
        });
    }
    //check verification code
    const auth = await UserAuth.findOne({
        'email' : req.body.email,
        'code' : req.body.code
    })
    if(!auth){
        return res.status(422).send({
            message: "Verification code is not right! Or it has expired!"
        })
    }
    await UserAuth.deleteOne({
        'email' : req.body.email,
        'code' : req.body.code
    })

    //write to db
    //user stores merely a map between uuid and pwd
    //it should not be accessed anywhere except /api/login
    //userinfo stores information about that user
    const newUUid = uuidv4();
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

//reset password
router.post('/api/reset_token/', async (req, res) => {
    const EMAIL = req.body.email;
    //create a transporter
    const transporter = nodeMailer.createTransport(smtpTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        secure: true,
        port:465,
        auth: {
            user: 'petpal455official@gmail.com',
            pass: '2021petpal455'
        }
    }))

    //send code
    let token = crypto.randomBytes(20).toString('hex')
    let resetURL = "http://localhost:3000/reset_pwd/"+token
    transporter.sendMail({
        from: 'petpal455official@gmail.com',
        to: EMAIL,
        subject: 'Password reset request',
        html: `
            <p>You are receiving this email because you have requested the reset of the password for your account <b>${EMAIL}</b></p>
            <p>Please click on the following link, or paste it into your browser to complete the process. This link expires after one hour of receiving it:</p>
            <p>${resetURL}</p>
            <p>***If you did not request to reset your password, please disgard this email and your password will remain unchanged.***</p>`
    }, function(error, data) {
        if(error){
            transporter.close();
            return res.status(500).send({
                message: "Error sending verification code"
            })
        }
    })

    const userInfo = await UserInfo.findOne({
        'email' : EMAIL
    })

    if(!userInfo){
        return res.send({
            message: "There is no account for this email address!"
        })
    }

    const uuid = userInfo.uuid;

    await UserReset.deleteMany({
        'uuid' : uuid
    })

    //store code into db
    await UserReset.create({
        'uuid' : uuid,
        'token' : token
    })

    res.send({
        message: "reset link sent!"
    })

    //set expiry time
    setTimeout(async()=>{
        await UserReset.deleteMany({
            'uuid' : uuid
        })
    },resetTokenMaxAge)    
})

router.post('/api/reset_pwd/:token', encryptPWD, async (req, res) => {
    const token = req.params.token;
    const userReset = await UserReset.findOne({
        'token' : token
    })
    if(!userReset){
        return res.send({
            message: "This session has expired!"
        })
    }

    const uuid = userReset.uuid;

    await User.updateOne({
        'uuid' : uuid
    },{
        'password' : req.body.password
    })

    await UserReset.deleteMany({
        'token' : token
    })

    return res.send({
        messsage: "You have successfully reset your password!. Please log in again"
    })
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
    // console.log(req.session);
    //not logged in
    if(req.session.uuid === undefined){
        return res.send({
            message : "Your session has expired. Please log in again!"
        })  
    }

    //return user information
    const user = await UserInfo.findOne({
        'uuid' : req.session.uuid
    }, (err, doc) => {
        if(err){
            res.status(404).send({
                message: "User does not exist!"
            })
        }
        else {
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
            res.send({
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

// update user info
router.post('/api/cur_user/info/update', async (req, res) => {
    if(req.session.uuid === undefined){
        res.send({
            message : "Your session has expired. Please log in again!"
        })
    } else {
        console.log("start update");
        // update user info
        const filter = { 'uuid': req.session.uuid };
        const update = { 
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.mail,
            city: req.body.city,
            intro: req.body.intro,
        };
        await UserInfo.findOneAndUpdate(filter, update, {
            new: true
        }, (err, doc) => {
            if(err){
                res.status(404).send({
                    message: "Something wrong when updating data"
                })
            } else {
                res.send(doc);
            }
        });

    }
})

router.post('/api/cur_user/avatar/update', async (req,res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
        let bitmap = fs.readFileSync(files.file.path);
        let base64str = Buffer.from(bitmap, 'binary').toString('base64'); 
        let base64 = 'data:' + files.file.type + ';base64,' + base64str
        console.log(req.session.uuid)
        await UserInfo.updateOne({
            "uuid" : req.session.uuid
        },{
            "avatar" : base64
        })
    });
    res.send("hello");
})

module.exports = router;