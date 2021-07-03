const database = require('../database/database');


const TransactionInfo = database.model('TransactionInfo', new database.Schema({
    orderNumber: String,
    buyerId: String,
    sellerId: String,
    animalId: String,
    timestamp: Date,
    price: Number,
    // Completed, Pending (withing 2 hours), Sold
    status: String,
    //Type of animal
    tag: String
}));

module.exports = TransactionInfo;
