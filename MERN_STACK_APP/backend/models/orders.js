const mongoose = require('mongoose');

let Order = new mongoose.Schema({
    Name: {
        type: String
    },
    prid: {
        type: String
    },
    Buyer: {
        type: String
    },
    stat: {
        type: String
    }
});

module.exports = mongoose.model('Order', Order);
