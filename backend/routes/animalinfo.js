var express = require('express');
var router = express.Router();
const fs = require('fs');

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


router.get("/", function (req, res) {
    console.log('handle get animal information');
    let rawdata = fs.readFileSync('data.json');
    res.send(rawdata);
});

module.exports = router;