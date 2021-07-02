var mongoose = require('mongoose');

const configs = {
    URL: '127.0.0.1:27017',
    Name: 'PetPal',
}

mongoose.connect('mongodb://' + configs.URL + '/' + configs.Name);

exports.configs = configs;
exports.mongoose = mongoose;