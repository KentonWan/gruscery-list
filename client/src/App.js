import React, { Component } from 'react';
import { Route } from 'react-router-dom';


import Landing from './components/Landing.js';
import Navigation from './components/Navigation.js';
import SignUp from './components/SignUp.js';
import SignIn from './components/SignIn.js';
import Lists from './components/Lists.js';
import List from './components/List.js';
import Item from './components/Item.js';
import SignOut from './components/SignOut';





import './App.css';


class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
    user: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));


  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };



  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    console.log(response);
    const body = await response.text();
    this.setState({ responseToPost: body });
  };


render() {
  
    return (
      <div className="App">
        <Navigation />


        <main className="main-container">
          <Route exact path="/" component={Landing} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/SignIn" component={SignIn} />
          <Route exact path="/Lists" component={Lists} />
          <Route path="/Lists/:id" component={List} />
        </main>
        
        {/* <p>{this.state.response}</p> */}
        {/* <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p> */}
      </div>
    );
  }
}
export default App;
