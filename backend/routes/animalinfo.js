var express = require('express');
var router = express.Router();
var formidable = require("formidable");
const fs = require('fs');
const AnimalInfo = require('../models/animalinfoModel');
const {UserInfo} = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');

let animalID = 4;

// For post one animalInfo
// request is required to be sent as a specific JSON format 
// (details are on Google Doc)
router.post('/post', async function (req, res) {
    console.log('handle animal post');
    try {
        let newEntry = req.body.animalinfo;
        newEntry["id"] = uuidv4();
        //const docs = await UserInfo.find({ uuid: req.body.userUUID });
        //console.log("Doc:", docs);
        //newEntry["userinfo"] = docs._id;
        newEntry["status"] = "available";

        AnimalInfo.create(newEntry, (err, docs) => {
            if (!err) {
                console.log('Inserted successfully' + docs);
            } else {
                console.log(err);
                res.status(500);
                res.send("You shall not pass!");
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send("You shall not pass!");
    }

});

router.get("/", async function (req, res) {
    try {
        console.log('handle get animal information');
        const infos = await AnimalInfo.find();
        //console.log(infos);
        //let rawdata = fs.readFileSync('data.json');
        res.send(infos);
    } catch (e) {
        console.log(e);
    }
});

// get posted animals according to user's uuid
// TODO: talk with shijun about userinfo references with type string
router.get("/uuid", async function (req, res) {
    if(req.session.uuid === undefined){
        res.send({
            message : "Your session has expired. Please log in again!"
        })
    } else {
        console.log("Get Uploaded Animals");

        await AnimalInfo.find();
    }
});

router.get("/kind", function (req, res) {
    
});

router.get("/cost", function (req, res) {
    
});

router.use('/public', express.static('public'));

router.post('/api/upload', async (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (error, fields, files) {
        console.log("parsing done");
        console.log(files.file);
        fs.writeFileSync("public/images/" + files.file.name, fs.readFileSync(files.file.path));
    });
    res.send("hello");
});

// Get status of an animalinfo
// request body example: 
// { "id" : ID_OF_THE_ANIMAL }
// response body example:
// { "status" : STATUS_OF_THE_ANIMAL }
router.post('/status', async (req, res) => {
    console.log(req.body.id);
    try {
        const info = await AnimalInfo.findOne({ id: req.body.id });
        console.log(info);
        res.send('{"status":' + info.status + '}');
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

// change the status of an animalinfo
// request body example: 
// { "id" : ID_OF_THE_ANIMAL }
router.post('/changestatus', async (req, res) => {
    console.log(req.body);
    try {
        let info = await AnimalInfo.updateOne({ "id": req.body.id }, { "status": req.body.status });
        res.send(200);
    } catch (err) {
        console.log(err);
        res.send(500);
    }
});

// Get seller's UserInfo of a certain animalinfo
// request body example: 
// { "id" : ID_OF_THE_ANIMAL }
// response is the JSON format data of userinfo table
router.post('/userinfo', async (req, res) => {
    try {
        let info = await AnimalInfo.find({ "id": req.body.id }).populate('userinfo');
        console.log(info[0].userinfo);
        res.send(info[0].userinfo);
    } catch (err) {
        console.log(err);
        res.send(500);
    }
});

module.exports = router;