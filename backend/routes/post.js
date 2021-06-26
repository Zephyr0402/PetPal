var express = require('express');
var router = express.Router();
const fs = require('fs');

router.post('/', function (req, res, next) {
    console.log('handle animal post');
    try {
        let rawdata = fs.readFileSync('data.json');
        let jsondata = JSON.parse(rawdata);
        jsondata['animalInfos'].push(req.body);
        console.log(jsondata['animalInfos']);
        rawdata = JSON.stringify(jsondata);
        fs.writeFileSync('data.json', rawdata);
    } catch (e) {
        console.log(e);
    }
    
});

module.exports = router;