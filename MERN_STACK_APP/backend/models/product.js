const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    Name: {
        type: String
    },
    Price: {
        type: Number
    },
    Quantity: {
        type: Number
    },
    Seller: {
        type: String
    },
    imgsrc: {
        type: String
    }
});

module.exports = mongoose.model('Product', Product);
