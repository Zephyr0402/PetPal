const database = require('../database/database');

const NotificationInfo = database.model('NotificationinfoModel', new database.Schema({
    type: String,
    sourceUserID: String,
    destinationUserID: String,
    contentID: String,
    timestamp: String
}));
module.exports = NotificationInfo;