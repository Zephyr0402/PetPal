var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const configs = {
    URL: '127.0.0.1:27017',
    Name: 'PetPal',
}

const animalInfoSchema = new Schema({
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
});

exports.configs = configs;
exports.animalInfoSchema = animalInfoSchema;