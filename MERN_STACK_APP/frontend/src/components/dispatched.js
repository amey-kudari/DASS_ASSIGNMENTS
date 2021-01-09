import React, {Component} from 'react';
import axios from 'axios';

export default class Dispatched extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Name: '',
            Product: '',
            Star: 0,
            Text: '',
            reviews: []
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.onChangeStar = this.onChangeStar.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeSrch = this.onChangeSrch.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:4000/reviews')
             .then(response => {
                 this.setState({reviews: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    onChangeName(event) {
        this.setState({ Name: event.target.value });
    }

    onChangeProduct(event) {
        this.setState({ Product: event.target.value });
    }

    onChangeStar(event) {
        this.setState({ Star: event.target.value });
    }

    onChangeText(event) {
        this.setState({ Text: event.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        const newUser = {    
            Name: this.state.Name,    
            Product: this.state.Product,    
            Star: this.state.Star,    
            Text: this.state.Text    
        }
        axios.post('http://localhost:4000/addreview', newUser)
             .then(res => console.log(res.data));
        this.setState({
            Name: '',
            Product: '',
            Star: 0,
            Text: '',
            srch: ''
        });
        window.location.reload();
    }

    onChangeSrch(event) {
        this.setState({ srch : event.target.value });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               placeholder="feel free to stay anonymous!"
                               value={this.state.Name}
                               onChange={this.onChangeName}
                               />
                    </div>
                    <div className="form-group">
                        <label>Product: </label>
                        <input type="text" 
                               className="form-control" 
                               placeholder="Name, Seller name if needed"
                               value={this.state.Product}
                               onChange={this.onChangeProduct}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Star: </label>
                        <input type="number"
                               className="form-control" 
                               placeholder="1-5, feel free to go out of bounds :P"
                               value={this.state.Star}
                               onChange={this.onChangeStar}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Text: </label>
                        <input type="text" 
                               className="form-control" 
                               placeholder="Reviews"
                               value={this.state.Text}
                               onChange={this.onChangeText}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit"
                               value="Add Listing"
                               className="btn btn-primary"/>
                    </div>
                </form>
                <div>
                <br/><hr/><br/>
                <h1>Product Reviews</h1>
                <br/><br/>
                        <input type="text" 
                               className="form-control" 
                               placeholder="Search"
                               value={this.state.srch}
                               onChange={this.onChangeSrch}
                               />  
                <br/><hr/><br/>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Product</th>
                                <th>Star</th>
                                <th>Review</th>
                            </tr>
                        </thead>
                        <tbody>
                        { 
                            this.state.reviews.map((currentp, i) => {
                                return (
                                    <tr key={i}>
                                        {(currentp.Product.includes(this.state.srch)||currentp.Text.includes(this.state.srch))&&(
                                        <td>{currentp.Name}</td>
                                        )}
                                        {(currentp.Product.includes(this.state.srch)||currentp.Text.includes(this.state.srch))&&(
                                        <td>{currentp.Product}</td>
                                        )}
                                        {(currentp.Product.includes(this.state.srch)||currentp.Text.includes(this.state.srch))&&(
                                        <td>{currentp.Star}</td>
                                        )}
                                        {(currentp.Product.includes(this.state.srch)||currentp.Text.includes(this.state.srch))&&(
                                        <td>{currentp.Text}</td>
                                        )}
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
