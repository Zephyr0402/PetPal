var mongoose = require('mongoose');

const configs = {
    URL: '127.0.0.1:27017',
    Name: 'PetPal',
}

const connection_url = 'mongodb+srv://m001-student:m001-mongodb-basics@cluster0.ovnsr.mongodb.net/Petpal?retryWrites=true&w=majority';

//mongoose.connect('mongodb://' + configs.URL + '/' + configs.Name);
//mongoose.connect('mongodb+srv://m001-student:m001-mongodb-basics@petpal-cpsc455.r7hhb.mongodb.net/PetPal?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
mongoose.connect(connection_url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

// mongoose.connect('mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb',  {useNewUrlParser: true})
//      .then(() => console.log( 'Database Connected' ))
//      .catch(err => console.log( err ));

module.exports = mongoose;
