import React, { Component } from 'react';
import {  withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const SignUpPage = () => 
    <div>
        <h2>Join Now & Start Shopping</h2>
        <SignUpForm  />
    </div>



class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null,
            loggedIn: false

        }
    }

    onSubmit = async e => {

        e.preventDefault();
        const response = await fetch('/users/new', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: this.state.email, password: this.state.password }),
          });
        console.log(response);
        const body = await response.json();
        console.log(body);

        this.setState({loggedIn: true});

        this.setState({email: '', password: ''});

      };


    render() {

        if(this.state.loggedIn) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container col-md-4 offset-md-4">
                <form className="signUpForm" onSubmit={this.onSubmit}>
                    <div className="form-group row">
                        <div className="col-sm-10 offset-sm-1">
                            <input name="email"
                                value={this.state.email}
                                onChange={e => this.setState({ email: e.target.value})}
                                type="text"
                                placeholder="Email Address"
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                    <div className="col-sm-10 offset-sm-1">
                            <input
                                name = "password"
                                value={this.state.password}
                                onChange={e => this.setState({password: e.target.value})}
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success"> Sign Up</button>
                
                </form>
            </div>
        )
    }
}


export default withRouter(SignUpPage);

export {
    SignUpForm,
}