var mongoose = require('mongoose');

const configs = {
    URL: '127.0.0.1:27017',
    Name: 'PetPal',
}

//mongoose.connect('mongodb://' + configs.URL + '/' + configs.Name);
//mongoose.connect('mongodb+srv://m001-student:m001-mongodb-basics@petpal-cpsc455.r7hhb.mongodb.net/PetPal?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
mongoose.connect('mongodb://localhost:27017/PetPal',  {useNewUrlParser: true})
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));

module.exports = mongoose;
