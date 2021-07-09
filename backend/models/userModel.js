// const mongoose = require('mongoose');
const database = require('../database/database');
// database.connect('mongodb://127.0.0.1:27017/users', {
//     useNewUrlParser: true
// })

const User = database.model('User', new database.Schema({
    uuid: {type: String},
    password: {type: String},
}))

const UserInfo = database.model('UserInfo', new database.Schema({
    uuid: {type: String},
    name: {type: String},
    email: {type: String},
    avatar: {type: String}
}))

const UserAuth = database.model('UserAuth', new database.Schema({
    email: {type: String},
    code: {type: String}
}))

const UserReset = mongoose.model('UserReset', new mongoose.Schema({
    uuid: {type: String},
    token: {type: String}
}))

module.exports = {User, UserInfo, UserAuth, UserReset}