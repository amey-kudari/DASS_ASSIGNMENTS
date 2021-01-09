import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import {Component} from 'react';

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import Products from './components/products'
import AddProduct from './components/addproducts'
import Dispatched from './components/dispatched'
import Seller from './components/seller'
import Orders from './components/orders'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            vendor : ''
        }
        if(localStorage.getItem('username')&&localStorage.getItem('password')){
            this.state.username = localStorage.getItem('username');
            this.state.password = localStorage.getItem('password');
            this.state.vendor = localStorage.getItem('vendor');
        } else {
            this.state.username = '';
            this.state.password = '';
            this.state.vendor = '';
        }
        //setInterval(()=>this.state.username=localStorage.getItem('username'),1000);
        this.onChangeUsername = this.onChangeUsername.bind(this);
    }

    onChangeUsername(){
        if(localStorage.getItem('username')&&localStorage.getItem('password')){
            this.state.username = localStorage.getItem('username');
            this.state.password = localStorage.getItem('password');
        } else {
            this.state.username = '';
            this.state.password = '';
        }
    }

    render() {
      return (
        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/" className="navbar-brand">App</Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/reviews" className="nav-link">Reviews</Link>
                  </li>

                  {(localStorage.getItem('vendor'))&&(
                  <li className="navbar-item">
                    <Link to="/addproducts" className="nav-link">
                      Add Products
                    </Link>
                  </li>
                  )}
                  <li className="navbar-item">
                    <Link to="/sellers" className="nav-link">
                        Sellers
                    </Link>
                  </li>
          
                  <li className="navbar-item">
                    <Link to="/orders" className="nav-link">
                        Orders
                    </Link>
                  </li>
                  <li className="navbar-item">
                    <Link className="nav-link">
                        |
                    </Link>
                  </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                  <li className="navbar-brand" onClick="{onChangeUsername}">
                    <Link to="/create" className="nav-link">
                        Welcome {this.state.username}!!
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            <br/>
            <Route path="/" exact component={Products}/>
            <Route path="/users" exact component={UsersList}/>
            <Route path="/create" component={CreateUser}/>
            <Route path="/addproducts" component={AddProduct}/>
            <Route path="/reviews" component={Dispatched}/>
            <Route path="/sellers" component={Seller}/>
            <Route path="/orders" component={Orders}/>
          </div>
        </Router>
      );
    }
}
