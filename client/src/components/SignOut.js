import React, { Component} from 'react';
import { Redirect, Link } from 'react-router-dom';

import Landing from "./Landing.js";

import './SignOut.css';

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
            <div className="signOut-container">
                <button type="button" className="btn btn-danger" onClick={this.signOut}><span className="signOut-btn">SignOut</span></button>
            </div>
        )
            
    }
}

export default SignOut;