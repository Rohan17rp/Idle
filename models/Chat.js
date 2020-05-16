const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    name: String,
    message: String,
})

mongoose.model('chat', chatSchema);