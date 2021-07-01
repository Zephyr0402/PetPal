var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const database = require('./database');

console.log(database);

mongoose.connect('mongodb://' + database.configs.URL + '/' + database.configs.Name);

// Check if is connecting to mongodb
mongoose.connection.once('open', () => {
    console.log('Connected to database', database.configs.Name, database.configs.URL);
});

// Check if mongodb has been disconnected
mongoose.connection.once('close', () => {
    console.log('Disconnected to database', database.configs.Name, database.configs.URL);
});

var animalModel = mongoose.model('AnimalInfo', database.animalInfoSchema);
animalModel.create({
    id: "0",
    name: "Jerry",
    image: "/animalImages/cat.png",
    age: "1.5",
    price: "200",
    user: "Julia",
    userAvatar: "userAvatars/julia.jpg",
    kind: "cat",
    description: "A cute cat!!!",
    address: "2725 Osoyoos Cres\nVancouver\nBC V6T 1X7\nCanada",
    position: {
        lat: "49.26127572955761",
        lng: "-123.23869115661624",
    }
}, (err, docs) => {
    if (!err) {
        console.log('Inserted successfully' + docs)
    }
});

animalModel.create({
    id: 1,
    name: "Yuki",
    image: "/animalImages/dog.png",
    age: "3",
    price: "200",
    user: "Nawa",
    userAvatar: "userAvatars/nawa.png",
    kind: "dog",
    description: "A cute dog!!!",
    position: { lat: 49.25727572955761, lng: -123.24769115661624 },
    address: "6328 Larkin Dr\nVancouver\nBC V6T 2K2\nCanada",
}, (err, docs) => {
    if (!err) {
        console.log('Inserted successfully' + docs)
    }
});

animalModel.create({
    id: 2,
    name: "Milly",
    image: "/animalImages/parrot.png",
    age: "6 month",
    price: 100,
    user: "Runze",
    userAvatar: "userAvatars/tsuki.jpg",
    kind: "bird",
    description: "A cute bird!!!",
    position: { lat: 49.25127572955761, lng: -123.23769115661624 },
    address: "3461 Ross Dr\nVancouver\nBC V6T 1W5\nCanada"
}, (err, docs) => {
    if (!err) {
        console.log('Inserted successfully' + docs)
    }
});

animalModel.create({
    id: 3,
    name: "Ruby",
    image: "/animalImages/fish.png",
    age: "3",
    price: "30",
    user: "Shijun",
    userAvatar: "userAvatars/shijun.jpg",
    kind: "Fish",
    description: "A cute fish!!!",
    position: { lat: 49.25127572955761, lng: -123.24769115661624 },
    address: "6804 SW Marine Dr\nVancouver\nBC V6T 1Z1\nCanada"
}, (err, docs) => {
    if (!err) {
        console.log('Inserted successfully' + docs)
    }
});
