var express = require('express');
var router = express.Router();
const fs = require('fs');
const AnimalInfo = require('../models/animalinfoModel');
var formidable = require("formidable");

let animalID = 4;

// For post one animalInfo
// request is required to be sent as a specific JSON format 
// (details are on Google Doc)
router.post('/post', function (req, res, next) {
    console.log('handle animal post');
    try {
        let rawdata = fs.readFileSync('data.json');
        let jsondata = JSON.parse(rawdata);
        let newEntry = req.body;
        newEntry["id"] = animalID;
        newEntry["userAvatar"] = "userAvatars/shijun.jpg";
        jsondata['animalInfos'].push(newEntry);
        console.log(jsondata['animalInfos']);
        rawdata = JSON.stringify(jsondata);
        fs.writeFileSync('data.json', rawdata);
    } catch (e) {
        console.log(e);
    }

});

router.get("/", async function (req, res) {
    try {
        console.log('handle get animal information');
        const infos = await AnimalInfo.find();
        console.log(infos);
        //let rawdata = fs.readFileSync('data.json');
        res.send(infos);
    } catch (e) {
        console.log(e);
    }
});

router.get("/kind", function (req, res) {
    
});

router.get("/cost", function (req, res) {
    
});

router.use('/public', express.static('public'));

router.post('/api/upload', async (req,res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function(error, fields, files) {
        console.log("parsing done");
        console.log(files.file);
        fs.writeFileSync("public/images/"+files.file.name, fs.readFileSync(files.file.path));
    });
    res.send("hello");
})

module.exports = router;