const database = require('../database/database');

const Comment = database.model('Comment', new database.Schema({
    ucid : {type: String},
    cmtorid : {type: String},
    uaid : {type: String},
    uuid : {type: String},
    fcid : {type: String},
    content: {type: String, default: ""},
    likes : {type: [String]},
    dislikes: {type: [String]},
    time: {type: Date},
    replies: {type: [String]} //array of ucid
}))

module.exports = Comment;