import React, {Component} from 'react';
import axios from 'axios';

export default class Seller extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reviews: [],
            sellers: [],
        }

        this.gstars = this.gstars.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:4000/reviews')
             .then(response => {
                 this.setState({reviews: response.data});
                 console.log(this.state.reviews);
             })
             .catch(function(error) {
                 console.log(error);
             })
        let vendors = []
        axios.get('http://localhost:4000/users')
            .then(response => {
                this.setState({sellers: response.data});
                console.log(this.state.sellers);
            })
            .catch(function(error) {
                console.log(error)
            })
        
    }

    gstars(vendorid){
        console.log(vendorid);
        let rel=this.state.reviews;
        console.log(rel);
        console.log(vendorid);
        rel = rel.filter(a=>a.Name.includes(vendorid));
        if(rel.length){
            let su=0;
            rel.forEach(a=>su+=a.Star);
            return su/rel.length;
        }
        console.log(rel);
        console.log(rel.length);
        return rel.length;
    }

    render() {
        return (
            <div>
                <h1> Seller Ratings </h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Star</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.sellers.map((currentp, i) => {
                            return (
                                <tr key={i}>
                                    {(currentp.vendor)&&(
                                    <td>{currentp.username}</td>
                                    )}
                                    {(currentp.vendor)&&(
                                    <td>{currentp._id}</td>
                                    )}
                                    {(currentp.vendor)&&(
                                    <td>{this.gstars(currentp._id)}</td>
                                    )}
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
