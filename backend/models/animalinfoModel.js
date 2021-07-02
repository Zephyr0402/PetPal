const mongoose = require('mongoose');
const database = require('../database/database');

mongoose.connect('mongodb://' + database.configs.URL + '/' + database.configs.Name);

const AnimalInfo = mongoose.model('AnimalInfo', new mongoose.Schema({
    id: Number,
    name: String,
    image: String,
    age: String,
    price: Number,
    user: String,
    userAvatar: String,
    king: String,
    description: String,
    address: String,
    position: {
        lat: String,
        lng: String,
    },
    // available or sold
    status: String,
}));

module.exports = AnimalInfo;