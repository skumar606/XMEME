const mongoose = require('mongoose');

// setup x_meme_db using install.sh file
const uri = 'mongodb://localhost:27017/x_meme_db';
// const uri = "mongodb+srv://skumar:C3sN50zUTRQPtE69@x-meme-db.nmq7o.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(!err) {
        console.log("Database is connected!");
    } else {
        console.log("Error occurred while connecting databse!", err);
    }
});

const Post = require('./post');