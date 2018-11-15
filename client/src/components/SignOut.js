import React, { Component} from 'react';

class SignOut extends Component {
    constructor(props){
        super(props);
    }

    signOut = async e => {

        e.preventDefault();
        const response = await fetch('/users/sign_out', {
            method: 'GET',
          });
        console.log(response);
        const body = await response.text();

    };

    render () {

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