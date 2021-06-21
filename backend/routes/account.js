var express = require('express');
var bcypt = require('bcrypt');
var router = express.Router();

var users = [];

const encryptPWD = async (req, res, next) => {
    req.body.password = bcypt.hashSync(req.body.password, 10);
    next();
}

//login
router.post('/api/login', async (req, res) => {
  let isUser = false;
  let pwd;
  for(let user of users){
    if(user.username === req.body.username){
        isUser = true;
        pwd = user.password;
    }
  }
  if(!isUser){
    return res.status(422).send({
        message : "user does not exist!"
    });
  }

  const isPwdValid = bcypt.compareSync(
      req.body.password,
      pwd
  )

  if(!isPwdValid){
    return res.status(422).send({
        message : "incorrect password!"
    });
  }

  res.send("login succesfully!");
});

//register
router.post('/api/register', encryptPWD, async(req, res) => {
    //check username duplicate
    for(let user of users){
        if(user.username === req.body.username){ 
            res.send("user already exist!");
            return;
        }
    }

    //write to db
    users.push(req.body);
    res.send(users);
})

module.exports = router;