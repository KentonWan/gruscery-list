import React from 'react';
import { Route, Link } from 'react-router-dom';


const Navigation = () => (
    <nav className="navbar navbar-expand-md fixed-top">
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="link" to='/SignUp'>Sign Up</Link>
                    </li>
                </ul>
            </div>
    </nav>
)

export default Navigation;