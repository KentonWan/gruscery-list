import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

const SignUpPage = ({history}) => 
    <div>
        <h2>Join Now & Start Shopping</h2>
        <SignUpForm history={history} />
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null

        }
    }


    onSubmit = (e) => {
        const {
            email,
            password
        } = this.state;

        const { history } = this.props;

        e.preventDefault();
    };

    handleUsernameChange(e){
        e.preventDefault();
        this.setState(byPropKey('username', e.target.value))
    };

    handleEmailChange(e){
        e.preventDefault();
        this.setState(byPropKey('email', e.target.value))
    };

    handleZipcodeChange(e){
        e.preventDefault();
        this.setState(byPropKey('zipcode', e.target.value))
    };

    handlePasswordChange(e){
        e.preventDefault();
        this.setState(byPropKey('password', e.target.value))
    };

    render() {
        const {
            email,
            password,
            error
        } = this.state;

        return (
            <div className="container col-md-4 offset-md-4">
                <form className="signUpForm" onSubmit={this.onSubmit}>
                    <div className="form-group row">
                        <div className="col-sm-10 offset-sm-1">
                            <input
                                value={email}
                                onChange={(e)=> this.handleEmailChange(e)}
                                type="text"
                                placeholder="Email Address"
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                    <div className="col-sm-10 offset-sm-1">
                            <input
                                value={password}
                                onChange={(e)=> this.handlePasswordChange(e)}
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success"> Sign Up</button>
                    {error && <p>{error.message}</p>}
                
                </form>
            </div>
        )
    }
}

const SignUpLink = () => 
    <p>
        Don't have an account?
        {' '}
        <Link to="/SignUp" style={{color: "green"}}>Sign Up</Link>
    </p>

export default withRouter(SignUpPage);

export {
    SignUpForm,
    SignUpLink
}