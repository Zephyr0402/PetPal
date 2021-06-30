const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/users', {
    useNewUrlParser: true
})

const User = mongoose.model('User', new mongoose.Schema({
    uuid: {type: String},
    password: {type: String},
}))

const UserInfo = mongoose.model('UserInfo', new mongoose.Schema({
    uuid: {type: String},
    name: {type: String},
    email: {type: String},
    avatar: {type: String}
}))

module.exports = {User, UserInfo}