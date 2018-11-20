import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import SignOut from './SignOut';
import SignUp from './SignUp';
import SignIn from './SignIn';



import './Navigation.css';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }

    setUser(currentUser) {
        let user = currentUser;
        this.setState({user: user})
    }


    render () {

        return (
            <nav className="navbar navbar-expand-md fixed-top">
                <div className="container">
                    <Link className="link" to="/"><img src={require('../shopping-cart-black.png')} width="25" alt="logo" className="logo" /><span className="logo-title">  GR'US'CERY LIST</span></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            {(this.state.user) ? 
                            <div>                        
                                <li className="nav-item-signedIn">
                                    <Link className="link list-link" to='/Lists'>Gr'us'cery Lists</Link>
                                </li>
                                <li className="nav-item-signedIn">
                                    <SignOut setUser={this.setUser.bind(this)}/>
                                    </li> 
                            </div>
                            : 
                            <div>
                                <li className="nav-item-signedOut">
                                    <SignUp setUser={this.setUser.bind(this)} />
                                </li>
                                <li className="nav-item-signedOut">
                                    <SignIn setUser={this.setUser.bind(this)} />
                                </li>
                            </div> 
                            }
                        </ul>
                    </div>

                </div>
            </nav>

        )
    }
}   


export default Navigation;