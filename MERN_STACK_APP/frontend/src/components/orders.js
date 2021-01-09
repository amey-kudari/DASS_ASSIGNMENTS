import React, {Component} from 'react';
import axios from 'axios';

export default class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            Name: ''
        }
        console.log(localStorage.getItem('password'));
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/orders')
             .then(response => {
                 let ords = response.data;
                 this.setState({orders: ords.filter(a=>(a.Buyer==localStorage.getItem('password')))});
                 console.log(this.state.orders);
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    async cancel(e){
        let order_id = e.target.value;
        let prid = e.target.parentElement.parentElement.childNodes[1].textContent
        console.log(prid);
        console.log(order_id);
        const rem = {
            _id : order_id
        }
        const up = {
            _id : prid
        }
        console.log(up);
        await axios.post('http://localhost:4000/delorder',rem)
            .then(res => console.log(res.data));
        await axios.post('http://localhost:4000/return',up)
            .then(res => console.log(res.data));
        window.location.reload();
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Orders</h1>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Product id</th>
                                <th>Status</th>
                                <th>Cancel</th>
                            </tr>
                        </thead>
                        <tbody>
                        { 
                            this.state.orders.map((currentp, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{currentp.Name}</td>
                                        <td>{currentp.prid}</td>
                                        <td>{currentp.stat}</td>
                                        {(currentp.stat=="WAITING")&&(
                                        <td><button type="button"
                                                    value = {currentp._id}
                                                    className="btn btn-danger"
                                                    onClick={this.cancel}>
                                                    X</button></td>
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
//}
