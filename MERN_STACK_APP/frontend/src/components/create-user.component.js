import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            vendor: false,
            password: '',
            Username: '',
            codeforces: '',
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeVendor = this.onChangeVendor.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangecodeforces = this.onChangecodeforces.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.oncSubmit = this.oncSubmit.bind(this);
        this.logout = this.logout.bind(this);

        if(localStorage.getItem('username')){
            this.state.Username = localStorage.getItem('username')
            if(localStorage.getItem('vendor')){
                this.state.vendor= true;
            }
            this.state.password = localStorage.getItem('password')
        }
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangeVendor(event) {
        this.setState({ vendor: event.target.checked });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangecodeforces(event){
        this.setState({ codeforces: event.target.value });
    }

    logout(e) {
        e.preventDefault();
        localStorage.setItem('username','');
        localStorage.setItem('password','');
        this.setState({
            username: '',
            email: '',
            vendor: false,
            password: '',
        });
        localStorage.setItem('vendor','');
        window.location.reload();
    }

    async onSubmit(e) {
        e.preventDefault();

        let newUser = {
            username: this.state.username,
            email: this.state.email,
            vendor: this.state.vendor,
            password: this.state.password
        }

        localStorage.setItem('username',this.state.username);
        localStorage.setItem('password',this.state.password);
        if(this.state.vendor){
            localStorage.setItem('vendor','a');
        } else localStorage.setItem('vendor','');

        localStorage.setItem('exists','');
        console.log(newUser.password);
        this.rusers = '!';
        this.res = await axios.get('http://localhost:4000/users')
        this.rusers = this.res.data;
        //while(this.rusers=='!'){};
        this.rusers.forEach(u=>{
            if(u.password==newUser.password){
                localStorage.setItem('exists','1');
                localStorage.setItem('username',u.username);
                localStorage.setItem('password',u.password);
            } else console.log(newUser.password + "==" + u.password);
        })
        if(localStorage.getItem('exists') == "1"){
            alert("Logged in!!");
        } else {
            console.log(localStorage.getItem('exists'))
            axios.post('http://localhost:4000/adduser', newUser)
                .then(res => console.log(res.data));
            alert("created!!");
        }
        window.location.reload();
    }

    async oncSubmit(e) {
        let name = this.state.codeforces.split('/')[4]
        e.preventDefault();

        this.state.username = this.state.password = this.state.email = name;
        this.state.vendor = true
        let newUser = {
            username: name,
            email: name,
            vendor: true,
            password: name
        }
        //console.log(newUser);

        localStorage.setItem('username',this.state.username);
        localStorage.setItem('password',this.state.password);
        if(this.state.vendor){
            localStorage.setItem('vendor','a');
        } else localStorage.setItem('vendor','');

        localStorage.setItem('exists','');
        console.log(newUser.password);
        this.rusers = '!';
        this.res = await axios.get('http://localhost:4000/users')
        this.rusers = this.res.data;
        while(this.rusers=='!'){};
        this.rusers.forEach(u=>{
            if(u.password==newUser.password){
                localStorage.setItem('exists','1');
                localStorage.setItem('username',u.username);
                localStorage.setItem('password',u.password);
            } else console.log(newUser.password + "==" + u.password);
        })
        if(localStorage.getItem('exists') == "1"){
            alert("Logged in!!");
        } else {
            console.log(localStorage.getItem('exists'))
            axios.post('http://localhost:4000/adduser', newUser)
                .then(res => console.log(res.data));
            alert("created!!");
        }
        window.location.reload();
    }

    render() {
        return (
            <div>
            {(!localStorage.getItem('username'))&&(
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               placeholder="not needed for login"
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               placeholder="not needed for login"
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Vendor: </label>
                        <input type="checkbox" 
                               placeholder="not needed for login"
                               className="form-control" 
                               value={this.state.vendor}
                               onChange={this.onChangeVendor}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login/Register" className="btn btn-primary"/>
                    </div>
                </form>
            )}
            {(!localStorage.getItem('username'))&&(
                <form onSubmit={this.oncSubmit}>
                    <div className="form-group">
                        <label>Codeforces Link (Social Media Login) : </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.codeforces}
                               onChange={this.onChangecodeforces}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login/Register" className="btn btn-primary"/>
                    </div>
                </form>
            )}

            {(localStorage.getItem('username'))&&(
                <form onSubmit={this.logout}>
                    <div className="form-group">
                        <input type="submit" value="Logout" className="btn btn-primary"/>
                    </div>

                </form>
            )}
            </div>
        )
    }
}
