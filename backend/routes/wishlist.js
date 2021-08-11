var express = require('express');
var router = express.Router();
const cors = require("cors");

const WishList = require('../models/wishlistModel');
const AnimalInfo = require('../models/animalinfoModel')

//find wishlist by user uuid and animal id
router.get("/:animalId&:uuid", cors(), async (req, res) => {
    WishList.find({
        animalId: req.params.animalId,
        userId: req.params.uuid,
    })
        .then(item => {
            res.status(200).json(item);
        })
        .catch(error => res.status(400).json('Fail to get animal from the wishlist: ' + error));
});

//get wishList by user uuid
router.get("/uuid", async (req, res) => {
    console.log(req.session)
    if(req.session.uuid === undefined){
        console.log("Session is expired")
    }else{
        WishList.find({
            userId: req.session.uuid,
        }, (err, docs) => {
            if(err){
                res.status(404).send({
                    message: 'Fail to get the wishlist: ' + err
                })
            } else {
                var ids = docs.map((doc) => { return doc.animalId; });
                // console.log(doc);
                // res.send(doc);
                AnimalInfo.find({"_id": {$in: ids}}, "id name image description price status address", (err, docs) => {
                    if(err){
                        res.status(404).send({
                            message: "Something wrong when getting animal info"
                        })
                    }else{
                        // console.log(docs)
                        res.send(docs)
                    }
                });
            }
        })
    }
});

//add animal to wishList
router.post("/add", cors(), async (req, res) => {
    let wishList = req.body;

    const newItem = new WishList({
        animalId: wishList.animalId,
        userId: wishList.userId
    });

    await newItem.save()
        .then(() =>
            res.status(200).json({
                message: "Successfully add animal to the wishlist",
                data: newItem
            }))
        .catch(error => res.status(400).json('Fail to add animal to the wishlist: ' + error));
});


//remove animal from wishList
router.delete("/delete", cors(), async (req, res) => {
    let wishList = req.body;
    WishList.findOneAndDelete({
        animalId: wishList.animalId,
        userId: wishList.userId
    })
        .then(() => res.status(200).json("Successfully delete animal from the wishlist"))
        .catch(error => res.status(400).json('Fail to delete animal from the wishlist: ' + error));
});

module.exports = router;
