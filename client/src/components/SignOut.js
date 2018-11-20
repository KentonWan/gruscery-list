import React, { Component} from 'react';
import { Redirect, Link } from 'react-router-dom';

import Landing from "./Landing.js";

class SignOut extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
    }

    signOut = async e => {

        e.preventDefault();
        const response = await fetch('/users/sign_out', {
            method: 'GET',
          });
        console.log(response);
        this.setState({redirect: true});
        this.props.setUser(null);
        const body = await response.text(); 
        console.log(body);       


    };

    render () {

        if(this.state.redirect) {
            return <Redirect to="/" />
        }

        return(
            <div>
                <button type="button" className="signOut" onClick={this.signOut}>SignOut</button>
            </div>
        )
            
    }
}

export default SignOut;