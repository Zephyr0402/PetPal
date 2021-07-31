const database = require('../database/database');

const WishListSchema = database.model('WishList', new database.Schema({
    animalId: String,
    userId: String,
}));

module.exports = WishListSchema;
