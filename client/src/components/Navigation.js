import React from 'react';
import { Route, Link } from 'react-router-dom';
import SignOut from './SignOut';


const Navigation = () => (
    <nav className="navbar navbar-expand-md fixed-top">
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="link" to='/SignUp'>Sign Up</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="link" to='/SignIn'>Sign In</Link>
                    </li>
                    <li className="nav-item">
                        <SignOut />
                    </li>
                </ul>
            </div>
    </nav>
)

export default Navigation;