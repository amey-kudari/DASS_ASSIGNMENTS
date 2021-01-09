import React, {Component} from 'react';
import axios from 'axios';

export default class AddProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Name: '',
            Price: 0,
            Quantity: 0,
            imgsrc: '',
            products: []
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeimgsrc = this.onChangeimgsrc.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.delist = this.delist.bind(this);

        this.password = localStorage.getItem('password');
    }
    componentDidMount() {
        axios.get('http://localhost:4000/products')
             .then(response => {
                 //this.setState({products: response.data});
                 let prds = []
                 response.data.forEach(rd => {
                     if(rd.Seller==localStorage.getItem('password')){
                         prds.push(rd);
                         console.log(rd);
                     }
                     else console.log(rd.Seller);
                 });
                 this.setState({products: prds});
                 console.log(this.state.products);
             })
             .catch(function(error) {
                 console.log(error);
             })
    }


    onChangeName(event){ this.setState({ Name: event.target.value }); }
    onChangePrice(event){ this.setState({ Price: event.target.value }); }
    onChangeQuantity(event){ this.setState({ Quantity: event.target.value }); }
    onChangeimgsrc(event){ this.setState({ imgsrc: event.target.value }); }

    onSubmit(e){
        e.preventDefault();
        const newUser = {    
            Name: this.state.Name,    
            Price: this.state.Price,    
            Quantity: this.state.Quantity,    
            Seller: localStorage.getItem('password'),    
            imgsrc: this.state.imgsrc
        }
        axios.post('http://localhost:4000/addproduct', newUser)
             .then(res => console.log(res.data));
        this.setState({
            Name: '',
            Price: 0,
            Quantity: 0,
        });
        window.location.reload();
    }

    delist(e){
        let id = e.target.value;
        const rem = {
            _id:id
        }
        const nrem = {
            prid : id
        }
        axios.post('http://localhost:4000/cancel',nrem).then(res=>{
            console.log(res);
        });
        axios.post('http://localhost:4000/delist',rem).then(res => {
            window.location.reload();
        });
    }

    dispatch(e){
        let id = e.target.value;
        const nrem = {
            prid : id
        }
        axios.post('http://localhost:4000/disp',nrem).then(res=>{
            console.log(res);
        });
        let product = e.target.parentElement.parentElement.childNodes[0].textContent
        const rem = {
            _id:id
        }
        axios.post('http://localhost:4000/delist',rem).then(res => {
            //window.location.reload();
            console.log(res);
        });
        const rev = {
            Name: "Dispatched Product vendor : " + id,
            Product: product,    
            Star: 5,    
            Text: "This is a dispatch notification"    
        }
        axios.post('http://localhost:4000/addreview', rev)
             .then(res => console.log(res.data));
        window.location.reload();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.Name}
                               onChange={this.onChangeName}
                               />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.Price}
                               onChange={this.onChangePrice}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Quantity: </label>
                        <input type="number"
                               className="form-control" 
                               value={this.state.Quantity}
                               onChange={this.onChangeQuantity}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Image: </label>
                        <input type="text"
                               className="form-control" 
                               value={this.state.imgsrc}
                               onChange={this.onChangeimgsrc}
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
                <h1>Your Listings</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Delist</th>
                                <th>Dispatch</th>
                            </tr>
                        </thead>
                        <tbody>
                        { 
                            this.state.products.map((currentp, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{currentp.Name}</td>
                                        <td>Price : {currentp.Price}</td>
                                        <td>Quantity : {currentp.Quantity}</td>
                                        <td>
                                            <button type="button" 
                                                    onClick={this.delist} 
                                                    className="btn btn-danger"
                                                    value={currentp._id}>
                                                    X 
                                                    </button>
                                        </td>
                                        {(currentp.Quantity==0)&&(
                                        <td>
                                            <button type="button" 
                                                    onClick={this.dispatch} 
                                                    className="btn btn-success"
                                                    dir={currentp.Name}
                                                    value={currentp._id}>
                                                    &#10004;
                                                    </button>
                                        </td>
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
