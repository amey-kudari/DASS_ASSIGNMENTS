const mongoose = require('mongoose');

let Review = new mongoose.Schema({
    Name: {
        type: String
    },
    Product: {
        type: String
    },
    Star: {
        type: Number
    },
    Text: {
        type: String
    }
});

module.exports = mongoose.model('Review', Review);
