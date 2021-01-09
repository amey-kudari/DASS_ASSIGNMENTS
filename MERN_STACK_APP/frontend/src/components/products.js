import React, {Component} from 'react';
import axios from 'axios';

export default class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            Name: ''
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.sortP = this.sortP.bind(this);
        this.sortQ = this.sortQ.bind(this);
        this.buy = this.buy.bind(this);
        this.getim = this.getim.bind(this);
        console.log(localStorage.getItem('password'));
    }

    componentDidMount() {
        axios.get('http://localhost:4000/products')
             .then(response => {
                 this.setState({products: response.data});
                 console.log(this.state.products);
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    onChangeName(event){ 
        this.setState({ Name: event.target.value }); 
    }
    
    sortP(){
        let arr = this.state.products;
        arr.sort(function(a,b){
            return a.Price-b.Price
        })
        this.setState({ products:arr });
    }

    sortQ(){
        let arr = this.state.products;
        arr.sort(function(a,b){
            return a.Quantity-b.Quantity
        })
        this.setState({ products:arr });
    }

    getim(url){
        if(url){
            return url;
        } else return "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSUH4kghA5oKQuh0_UDxyxlNG727_p6satd8E-m_9JNL-eitLl5"
    }

    async buy(e){
        let id = e.target.value;    
        let q = e.target.parentNode.parentNode.childNodes[2].textContent;
        const rem = {    
            _id:id    
        }    
        const norder = {
            Name : e.target.parentNode.parentNode.childNodes[0].textContent,
            prid : id,
            Buyer : localStorage.getItem('password'),
            stat : 'WAITING'
        }
        await axios.post('http://localhost:4000/addorder',norder).then(res=>{
            console.log(res);
        });
        console.log(norder);
        if(q==1){
            // set all as done!
            const nrem = {
                prid : id
            }
            await axios.post('http://localhost:4000/place',nrem).then(res=>{
                console.log(res);
            });
        }
        await axios.post('http://localhost:4000/buy',rem).then(res => {    
            window.location.reload();    
        });
        //console.log(e.target.parentNode.parentNode.childNodes[0].textContent);
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Products!! :D</h1>
                </div>
                <div>
                        <input type="text"     
                               placeholder = "Search"
                               className="form-control"     
                               value={this.state.Name}    
                               onChange={this.onChangeName}    
                               />
                        <br/>
                        <button type="button" className="btn btn-primary mr-4" onClick={this.sortP}>
                            Sort by Price
                        </button>
                        <button type="button" className="btn btn-primary" onClick={this.sortQ}>
                            Sort by Quantity
                        </button>
                    
                    <br/><br/><hr/><br/>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                        { 
                            this.state.products.map((currentp, i) => {
                                return (
                                    <tr key={i}>
                                    {((currentp.Name.includes(this.state.Name))&&(currentp.Quantity>0))&&(
                                        <td>
                                        {currentp.Name} <br/>
                                        <img width="100px" src={this.getim(currentp.imgsrc)}/>
                                        </td>
                                    )}
                                    {((currentp.Name.includes(this.state.Name))&&(currentp.Quantity>0))&&(
                                        <td>{currentp.Price}</td>
                                    )}
                                    {((currentp.Name.includes(this.state.Name))&&(currentp.Quantity>0))&&(
                                        <td>{currentp.Quantity}</td>
                                    )}
                                    {((currentp.Name.includes(this.state.Name))&&(currentp.Quantity>0))&&(
                                        <td><button type="button" className="btn btn-success" value={currentp._id} onClick={this.buy}>B</button></td>
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
