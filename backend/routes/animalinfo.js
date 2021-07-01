var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const fs = require('fs');
const database = require('../database/database');

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
        // mongoose.connect('mongodb://' + database.configs.URL + '/' + database.configs.Name, async (err) => {
        //     if (!err) {
        //         const animalInfos = mongoose.model('AnimalInfo', database.animalInfoSchema);
        //         // console.log(animalInfos);
        //         await animalInfos.find().lean().exec(function (err, infos) {
        //             console.log(JSON.stringify(infos));
        //             res.send(JSON.stringify(infos));
        //         });
        //     } else {
        //         console.log(err);
        //     }
        // });
        let rawdata = fs.readFileSync('data.json');
        res.send(rawdata);
    } catch (e) {
        console.log(e);
    }
});

router.get("/kind", function (req, res) {
    
});

router.get("/cost", function (req, res) {
    
});

module.exports = router;