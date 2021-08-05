const database = require('../database/database');

const Channel = database.model('Channel', new database.Schema({
    cid: {type: String},
    name: {type: String},
    members : {type: [String]}
}))

const Whisper = database.model('Whisper', new database.Schema({
    cid: {type: String},
    wid: {type: String},
    sender: {type: String},
    content: {type: String},
    unread: {type: [String]},
    timestamp : {type: Date}
}))

module.exports = {Channel, Whisper};