var mongoose = require('mongoose');

const configs = {
    URL: '127.0.0.1:27017',
    Name: 'PetPal',
}

//mongoose.connect('mongodb://' + configs.URL + '/' + configs.Name);
mongoose.connect('mongodb+srv://m001-student:m001-mongodb-basics@petpal.r7hhb.mongodb.net/PetPal?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

module.exports = mongoose;
