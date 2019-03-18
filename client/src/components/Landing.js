import React from 'react';
import logo from '../shopping-cart.png';
import './Landing.css';


const Landing = () => (
    <div>
        {/* <header className="App-header">
            <div className="App-title">
                <h1 className="App-name"><img src={logo} className="App-logo" alt="logo" />  GR'US'CERY LIST  <img src={logo} className="App-logo" alt="logo" /></h1>
            </div>
          <h4 className="App-subtitle">shop together. shop faster.</h4>
        </header>
        <section className="col md-4 content">
            <img src="data:image/png;base64,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" height="40" alt="ground of people"/>
            <p>A real-time app that lets your family, friends and you shop together.</p>
        
        </section> */}

    <div className="view" id="home">
        <div className="mask rgba-black-light align-items-center">
            <div className="container">
            <div className="row">
                <div className="title col-md-12 mb-4 white-text text-center">
                <h1 className="h1-reponsive white-text text-uppercase font-weight-bold mb-0 pt-md-5 pt-5 wow"><strong>Gr'us'cery List</strong></h1>
                <hr className="hr-light my-4 wow fadeInDown"></hr>
                <h5 className="text-uppercase mb-3 white-text wow fadeInDown" >A real-time app that lets your family, friends and you shop together.</h5>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
   
);

export default Landing;