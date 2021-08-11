const database = require('../database/database');

const User = database.model('User', new database.Schema({
    uuid: {type: String},
    password: {type: String},
}))

const UserInfo = database.model('UserInfo', new database.Schema({
    uuid: {type: String},
    name: {type: String},
    email: {type: String},
    avatar: {type: String},
    phone: {type: String},
    city: {type: String},
    intro: {type: String},
    rating: {type: String},
}))

const UserAuth = database.model('UserAuth', new database.Schema({
    email: {type: String},
    code: {type: String}
}))

const UserReset = database.model('UserReset', new database.Schema({
    uuid: {type: String},
    token: {type: String}
}))

module.exports = {User, UserInfo, UserAuth, UserReset}