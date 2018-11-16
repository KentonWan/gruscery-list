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
                <div className="container text-center">
                    <Link className="link" to="/"><img src={require('../shopping-cart.jpg')} width="20" alt="logo" className="logo" /></Link>
                    <div>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            {(this.state.user) ? 
                            <div>                        
                                <li className="nav-item">
                                    <Link className="link" to='/Lists'>Lists</Link>
                                </li>
                                <li className="nav-item">
                                    <SignOut setUser={this.setUser.bind(this)}/>
                                    </li> 
                            </div>
                            : 
                            <div>
                                <li className="nav-item">
                                    <SignUp setUser={this.setUser.bind(this)} />
                                </li>
                                <li className="nav-item">
                                    <SignIn setUser={this.setUser.bind(this)} />
                                </li>
                            </div> 
                            }
                        </ul>
                    </div>
                    </div>
                </div>
            </nav>

        )
    }
}   


export default Navigation;