var express = require('express');
var router = express.Router();
const cors = require("cors");

const WishList = require('../models/wishlistModel');

//find wishlist by user uuid and animal id
router.get("/:animalId&:uuid", cors(), async (req, res) => {
    WishList.find({
        animalId: req.params.animalId,
        userId: req.params.uuid,
    })
        .then(item => {
            res.json(item);
        })
        .catch(error => res.status(400).json('Fail to get animal from the wishlist: ' + error));
});

//get wishList by user uuid
router.get("/:uuid", cors(), async (req, res) => {
    WishList.find({
        userId: req.params.uuid,
    })
        .then(wishList => res.json(wishList))
        .catch(error => res.status(400).json('Fail to get the wishlist: ' + error));
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
            res.json({
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
    }).then(() =>
        res.json({
            message: "Successfully delete animal from the wishlist",
        }))
        .catch(error => res.status(400).json('Fail to delete animal from the wishlist: ' + error));
});

module.exports = router;
