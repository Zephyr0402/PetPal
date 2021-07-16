// const mongoose = require('mongoose');
const database = require('../database/database');

// database.connect('mongodb://' + database.configs.URL + '/' + database.configs.Name);

const AnimalInfo = database.model('AnimalInfo', new database.Schema({
    id: String,
    name: String,
    image: String,
    age: String,
    price: Number,
    userinfo: { type: String, ref: 'UserInfo' },
    kind: String,
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
