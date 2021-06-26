var express = require('express');
var bcypt = require('bcrypt');
var router = express.Router();
var session = require('express-session');
//var cors = require('express-cors');
var cors = require('cors');
// var flatted = require('flatted/cjs');
var formidable = require("formidable");
fs = require("fs");

var users = [];
var corsOptions = {
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: 'Content-type',
    credentials: true
}

router.use(cors(corsOptions));

router.use(session({
    name: "sid",
    secret: 'whxn', // 建议使用 128 个字符的随机字符串
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {maxAge:10*1000, secure:false}
}));

const encryptPWD = async (req, res, next) => {
    console.log(req.body);
    req.body.password = bcypt.hashSync(req.body.password, 10);
    next();
}

//register
router.post('/api/register', encryptPWD, async(req, res) => {
    //check username duplicate
    for(let user of users){
        if(user.username === req.body.username){ 
            return res.status(422).send({
                messgae : "user already exist!"
            });
        }
    }

    //write to db
    users.push(req.body);
    res.send(users);
})

//login
router.post('/api/login',  async (req, res) => {
    
    let isUser = false;
    let thisUser;
    let pwd;
    //check if user exists
    for(let user of users){
      if(user.username === req.body.username){
          isUser = true;
          thisUser = user;
          pwd = user.password;
      }
    }
    if(!isUser){
      return res.status(422).send({
          message : "user does not exist!"
      });
    }
  
    //check if password is correct
    const isPwdValid = bcypt.compareSync(
        req.body.password,
        pwd
    )
  
    if(!isPwdValid){
      return res.status(422).send({
          message : "incorrect password!"
      });
    }
    
    res.send({
        username: thisUser.username,
        avatar: thisUser.avatar
    });
  });

router.post('/api/testPost', async(req, res) => {
    res.send("hello");
})

router.get('/api/logout', async(req, res) => {
    req.session.Logged = 0;
    for(let user of users){
        if(user.sessionID === req.sessionID){
            user.sessionID = "";
            return res.send({
                Logged: 0
            })
        }
    }
})

router.get('/api/userStatus/:username', async (req,res) => {
    username = req.params.username;
    if(username === "_none_"){
        //in a session
        if(req.session.Logged){
            for(let user of users){
                if(user.sessionID === req.sessionID){
                    return res.send({
                        Logged: 1,
                        username: user.username,
                        avatar: user.avatar
                    })
                }
            }
        }
        else{//no session
            res.send({
                Logged:0
            })
        }
    }
    else{
        req.session.Logged = 1;
        res.cookie({signed: true});
        for(let user of users){
            if(user.username === username){
                user.sessionID = req.sessionID;
                return res.send({
                    Logged: 1,
                    username: user.name,
                    avatar: user.avatar,
                    sessionID: user.sessionID
                })
            }
        }
        
    }
    
})

router.get('/api/cookie-session',  async(req,res) => {
    if(req.session.isFirst || req.cookies.isFirst) {
        res.send({
            session : req.session,
            cookie: req.cookies,
            sessionID: req.sessionID
        });
    } else {
        req.session.isFirst = 1;
        res.cookie({signed: true});
        res.send("helo");
    }
})

router.use('/public', express.static('public'));

router.post('/api/upload', async (req,res) => {
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(req, function(error, fields, files) {
        console.log("parsing done");
        console.log(files.file.path);
        fs.writeFileSync("public/images/test.png", fs.readFileSync(files.file.path));
    });
    res.send("hello");
})

router.get('/api/test',function(req, res, next) {
    if (req.url === '/favicon.ico') {
      return
    }
  
    // 同一个浏览器而言，req是同一个
    var sess = req.session;
    console.log(sess)
  
    if (sess.views) {
      sess.views++;
    } else {
      sess.views = 1;
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>views: ' + sess.views + '</p>');
    res.end();
  })

module.exports = router;