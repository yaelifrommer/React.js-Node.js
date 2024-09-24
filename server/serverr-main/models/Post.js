const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    likes: { type: Number, default: 0 }, // The likes counter(not working).
    createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Post', postSchema);
