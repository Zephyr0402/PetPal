var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
const database = require('../database/database');

const TransactionSchema = new mongoose.Schema({
    orderNumber: Number, //auto increment sequential number
    buyerId: String,
    sellerId: String,
    animalId: String,
    animalIndex: Number,
    timestamp: Date,
    price: Number,
    status: String, //Completed, Pending, Sold
    tag: String, //Type of animal
    stripeId: String
});

TransactionSchema.plugin(AutoIncrement, {id:'order_seq', inc_field: 'orderNumber', start_seq: 1000});

const TransactionModel = database.model('Transaction', TransactionSchema);

module.exports = TransactionModel;
