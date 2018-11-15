import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

const SignInPage = () => 
    <div>
        <h2>Sign In</h2>
        <SignInForm  />
    </div>



class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',

        }
    }

    onSubmit = async e => {

        e.preventDefault();
        const response = await fetch('/users/sign_in', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: this.state.email, password: this.state.password }),
          });
        console.log(response);
        const body = await response.text();

        this.setState({email: '', password: ''});
      };


    render() {

        return (
            <div className="container col-md-4 offset-md-4">
                <form className="signInForm" onSubmit={this.onSubmit}>
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
                    <button type="submit" className="btn btn-success"> Sign In</button>
                
                </form>
            </div>
        )
    }
}


export default withRouter(SignInPage);

export {
    SignInForm,
}