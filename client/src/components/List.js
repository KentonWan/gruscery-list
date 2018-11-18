import React, { Component} from 'react';
import {Link, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: [],
            redirect: false,
            newTitle: ''
        }
        

    }

    componentDidMount() {
        this.getList()
          .then(res => this.setState({ list: res.list }))
          .catch(err => console.log(err));
    };

    getList = async () => {
        const response = await fetch(`/lists/${this.props.match.params.id}`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("list",body);
        return body;
        this.forceUpdate();
      }; 

      onDelete = async e => {

        e.preventDefault();
        const response = await fetch(`/lists/${this.props.match.params.id}/destroy`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        console.log("delete",response);
        const body = await response.text();

      };

      editTitle = async e => {

        e.preventDefault();
        const response = await fetch(`/lists/${this.props.match.params.id}/update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: this.state.newTitle }),
          });
        console.log("update",response);
        const body = await response.text();
        console.log("update body", body);
        this.setState({newTitle: ""});
        this.getList();

      };





    render () {

        if(this.state.redirect) {
            return <Redirect to='/lists/' />
        }

        console.log(this.state.list)

        return(
            <div className="container">
            <h4>{this.state.list.title}</h4>
            <form onSubmit={this.onDelete}>
                <button type="submit" className="btn btn-danger">Delete List</button>
            </form>
            <form onSubmit={this.editTitle}>
                <input type="text" name="title" value={this.state.newTitle} onChange={e => this.setState({ newTitle: e.target.value})} placeholder="New Title" />
                <button type="submit" className="btn btn-danger">Edit List Title</button>
            </form>
            </div>
        )
    }
}

export default List;

