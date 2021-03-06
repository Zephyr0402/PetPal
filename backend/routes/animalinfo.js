var express = require('express');
var router = express.Router();
var formidable = require("formidable");
const fs = require('fs');
const AnimalInfo = require('../models/animalinfoModel');
const {UserInfo} = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');

// For post one animalInfo
// request is required to be sent as a specific JSON format
// (details are on Google Doc)
router.post('/post', async function (req, res) {
    try {
        let newEntry = req.body.animalinfo;
        newEntry["id"] = uuidv4();
        newEntry["status"] = "available";

        AnimalInfo.create(newEntry, (err, docs) => {
            if (!err) {
                res.send(200);
            } else {
                res.status(500);
                res.send("You shall not pass!");
            }
        });
    } catch (err) {
        res.status(500);
        res.send("You shall not pass!");
    }

});

router.get("/", async function (req, res) {
    try {
        const infos = await AnimalInfo.find({ "status": "available" }).populate('userinfo');
        res.send(infos);
    } catch (e) {
    }
});

// get posted animals according to user's uuid
router.get("/posted/:uuid?", async function (req, res) {
    uuid = req.params.uuid;
    if(req.session.uuid === undefined){
        console.log("Session is expired")
        res.send([])
    } else {

        await UserInfo.find({"uuid": uuid}, "_id", (err, docs) => {
            if(err){
                res.status(404).send({
                    message: "Something wrong when getting user info"
                })
            } else {
                var ids = docs.map(function(doc) { return doc._id; });
                AnimalInfo.find({"userinfo": {$in: ids}}, "id name image description price status address", (err, docs) => {
                    if(err){
                        res.status(404).send({
                            message: "Something wrong when getting animal info"
                        })
                    }else{
                        res.send(docs)
                    }
                });
            }
        })


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
    try {
        const info = await AnimalInfo.findOne({ id: req.body.id });
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
        res.send(info[0].userinfo);
    } catch (err) {
        console.log(err);
        res.send(500);
    }
});


router.delete("/delete/:animalId", async (req, res) => {
    AnimalInfo.findByIdAndDelete(req.params.animalId)
   .then(() => res.status(200).json("Successfully delete animal"))
   .catch(error => res.status(400).json('Fail to delete animal: ' + error));
});

module.exports = router;
