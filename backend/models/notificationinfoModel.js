const database = require('../database/database');

const NotificationInfo = database.model('NotificationInfo', new database.Schema({
    type: String,
    sourceUserID: String,
    destinationUserID: String,
    contentID: String,
    timestamp: Date
}));
module.exports = NotificationInfo;