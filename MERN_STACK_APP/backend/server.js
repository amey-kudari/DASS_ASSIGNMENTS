const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

// orders.js  product.js  reviews.js  user.js
let User = require('./models/user');
let Product = require('./models/product')
let Review = require('./models/reviews')
let Order = require('./models/orders')

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/ssad', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/users').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Getting all the products
userRoutes.route('/products').get(function(req,res) {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

// Getting all the reviews
userRoutes.route('/reviews').get(function(req,res) {
    Review.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

// Getting all the orders
userRoutes.route('/orders').get(function(req,res) {
    Order.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

// Adding a new user
userRoutes.route('/adduser').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Adding a new product
userRoutes.route('/addproduct').post(function(req, res) {
    let user = new Product(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'Product': 'Product added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Adding a new orders
userRoutes.route('/addorder').post(function(req, res) {
    let user = new Order(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'Order': 'ORder added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Adding a new reviews
userRoutes.route('/addreview').post(function(req, res) {
    let user = new Review(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'Review': 'Review added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Getting a user by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.password;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

// delete a listing by id
userRoutes.route('/delist').post(function(req, res) {
    let id = req.body;
    console.log(id)
    let user = new Product(req.body);
    user.remove(id, function(err, user) {
        res.json({'result': 'deleted successfully'});
    });
});

userRoutes.route('/buy').post(function(req, res) {
    let id = req.body;
    let upd = { $inc: { 'Quantity': -1 } } 
    Product.findOneAndUpdate(id, upd, function(err, prd){
        res.json(prd);
    });
});

userRoutes.route('/return').post(function(req,res){
    let id = req.body;
    let upd = { $inc: {'Quantity': 1 } }
    Product.findOneAndUpdate(id, upd, function(err, prd){
        res.json(prd);
    });
});

userRoutes.route('/place').post(function(req, res) {
    let id = req.body;
    let upd = { 'stat' : 'PLACED' }
    Order.updateMany(id,upd,function(err,prd){
        res.json(prd);
    });
});

userRoutes.route('/cancel').post(function(req, res) {
    let id = req.body;
    let upd = { 'stat' : 'CANCELED' }
    Order.updateMany(id,upd,function(err,prd){
        res.json(prd);
    });
});

userRoutes.route('/disp').post(function(req, res) {
    let id = req.body;
    let upd = { 'stat' : 'DISPATCHED' }
    Order.updateMany(id,upd,function(err,prd){
        res.json(prd);
    });
});

userRoutes.route('/delorder').post(function(req,res) {
    let id = req.body;
    Order.remove(id,function(err,ret) {
        res.json(ret);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
