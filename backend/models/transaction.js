const database = require('../database/database');


const Transaction = database.model('Transaction', new database.Schema({
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

module.exports = Transaction;
