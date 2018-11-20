import React, { Component} from 'react';
import { Redirect } from 'react-router-dom';

class SignOut extends Component {
    constructor(props){
        super(props);
        this.state = {
            signedOut: false
        }
    }

    signOut = async e => {

        e.preventDefault();
        const response = await fetch('/users/sign_out', {
            method: 'GET',
          });
        console.log(response);
        const body = await response.text();        
        this.props.setUser(null);
        this.setState({signedOut: true});


    };

    render () {

        if(this.state.signedOut) {
            return <Redirect to="/" />
        }

        return(
            <button
                type="button"
                onClick={this.signOut}
            >
            Sign Out
            </button>
        )
    }
}

export default SignOut;