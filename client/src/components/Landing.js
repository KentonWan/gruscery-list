import React from 'react';
import logo from '../shopping-cart.jpg';
import './Landing.css';


const Landing = () => (
    <div>

         <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-name">grUScery list</h1>
          <h4 className="App-subtitle">SHOP TOGETHER. SHOP FASTER.</h4>
        </header>

    </div>
   
);

export default Landing;