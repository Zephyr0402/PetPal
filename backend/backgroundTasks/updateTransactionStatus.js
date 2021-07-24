const Transaction = require('../models/transactionModel');

//Update transaction status to "complete" after 2 hours
function updateTransactionStatus() {
    Transaction.updateMany({status: "pending", timestamp: {$lt: new Date() - 7200000}},
        {status: "complete"}, function (err, docs) {
            if (err){
                console.log(err)
            }else{
                console.log("updateTransactionStatus: ", docs);
            }
        });
}

module.exports = updateTransactionStatus;
