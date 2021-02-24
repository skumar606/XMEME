const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    name: String,
    url: String,
    caption: String,
    timestamp: Date
})

module.exports = mongoose.model('Post', PostSchema);
