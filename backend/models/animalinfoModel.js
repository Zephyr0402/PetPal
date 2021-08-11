const database = require('../database/database');

const AnimalInfo = database.model('AnimalInfo', new database.Schema({
    id: String,
    name: String,
    image: String,
    animalAgeYear: String,
    animalAgeMonth: String,
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
