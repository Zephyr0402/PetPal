const database = require('../database/database');

const Comment = database.model('Comment', new database.Schema({
    ucid : {type: String},
    cmtorid : {type: String},
    uaid : {type: Number},
    uuid : {type: String},
    fcid : {type: String},
    content: {type: String, default: ""},
    likes : {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    time: {type: Date},
    replies: {type: [String]} //array of ucid
}))

module.exports = Comment;